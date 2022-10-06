export const useForm = (SimpleOnSubmit, id) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const InputsValues = Array.from(e.target).map((input) => input.value)
    SimpleOnSubmit(InputsValues)
  }

  return { formProps: { onSubmit, id } }
}
