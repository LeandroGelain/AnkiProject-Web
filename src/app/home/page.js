'use client'
import React, { useEffect, useState } from 'react'
import { Button, FlashCardComponent, Page } from '@/components'
import { useSnackbar } from '@/hooks'
import { useFieldArray, useForm } from 'react-hook-form'
import api from '@/api/requests/cards'

export default function HomePage() {
  const { openSnackbar } = useSnackbar()
  const { handleSubmit, control, register, getValues, setValue } = useForm({})
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'flashCardInputs',
  })
  const [inputGroups, setInputGroups] = useState([])
  const [indexGroupCount, setIndexGroupCount] = useState(0)
  const [refresh, setRefresh] = useState(1)
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(true)

  const [saveResponses, setSaveResponses] = useState([])

  const execRefresh = () => {
    setRefresh(refresh + 1)
    setInputGroups(inputGroups.filter(Boolean))
  }

  const loadingCards = async () => {
    if (!loading) return

    const responseData = await api.get()
    setResponse(responseData)

    responseData.data.cards.map((data) => {
      if (getValues().flashCardInputs.find((field) => field?.id === data.id))
        return
      appendForm(null, data)
    })

    setLoading(false)
  }

  useEffect(() => {
    loadingCards()
  }, [])

  useEffect(() => {
    if (saveResponses.length === 0) return

    if (
      saveResponses
        .map((code) => code !== 200 || code !== 201)
        .find((x) => x == false) === undefined
    ) {
      openSnackbar({
        message: 'Cards criados com sucesso!',
        type: 'success',
      })
    } else {
      openSnackbar({
        message: 'Erro ao criar os cards',
        type: 'error',
      })
    }
  }, [saveResponses])

  // Refatorar para aceitar a imagem
  const submitForm = async (data) => {
    data.flashCardInputs.map(async (cardData) => {
      const request = cardData.id == '' ? api.post : api.edit

      let formData = new FormData()
      formData.append('image', cardData.image)

      const response = await request({
        card: { ...cardData, image: formData },
      })
      setSaveResponses([...saveResponses, response.status])
    })
    // const responseEdit = await api.edit({
    //   cards: formatDataToEdit(data.flashCardInputs).filter(Boolean),
    // })
    // const responseCreate = await api.post({
    //   cards: formatDataToCreate(data.flashCardInputs).filter(Boolean),
    // })
    // console.log(responseCreate, responseEdit)
    execRefresh()
  }

  const appendForm = (e, data) => {
    if (e) e.preventDefault()
    append({
      id: data?.id || '',
      image: data?.image || null,
      currentLang: data?.currentLang || '',
      foreignLang: data?.foreignLang || '',
    })
    const newInputGroups = [...getValues().flashCardInputs]
    setInputGroups(newInputGroups)

    setIndexGroupCount(indexGroupCount + 1)
  }

  const removeCardFunction = async (e, group) => {
    e.preventDefault()
    if (group.id) {
      api.destroy(group.id)
    }
    remove(
      fields.findIndex(
        (field) =>
          field.currentLang == group.currentLang &&
          field.foreignLang == group.foreignLang
      )
    )

    delete inputGroups[inputGroups.indexOf(group)]
    setInputGroups(inputGroups.filter(Boolean))
    execRefresh()
  }

  return (
    <Page auth>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4 m-4 place-items-center'>
          {response &&
            inputGroups.map((group, indexGroup) => {
              return (
                <div key={indexGroup}>
                  <FlashCardComponent
                    index={indexGroup}
                    removeCardFunction={(e) => removeCardFunction(e, group)}
                    control={control}
                    register={register}
                    setValue={setValue}
                    group={group}
                  />
                </div>
              )
            })}
          <FlashCardComponent createNew appendFunction={appendForm} />
        </div>
        <div
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
          }}
        >
          <Button
            type='submit'
            text='Salvar todos'
            className='p-4 font-bold rounded-xl'
          />
        </div>
      </form>
    </Page>
  )
}
