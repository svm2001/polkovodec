import $ from 'jquery'
export default function validate() {
  const forms = document.querySelectorAll('[data-validate]')

  if (!forms.length) return

  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      const inputs = form.querySelectorAll('.input'),
        dataReqexp = {
          fio: /^[А-ЯЁа-яё]+(-[А-ЯЁа-яё]+)? [А-ЯЁа-яё]+( [А-ЯЁа-яё]+)?$/,
          personName: /^[а-яёА-ЯЁ ]+$/u,
          email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
          numbers: /^\d+$/,
        },
        error = (el, msg = 'Обязательное поле') => {
          const message = el.querySelector('.input__message')

          return {
            set: () => {
              if (message) message.innerText = msg
              el.classList.add(
                el.classList.contains('input')
                  ? 'input--error'
                  : 'textarea--error',
              )
            },
            remove: () => {
              el.classList.remove(
                el.classList.contains('input')
                  ? 'input--error'
                  : 'textarea--error',
              )
              if (message) message.innerText = ''
            },
          }
        },
        validateTextarea = textarea => {
          const field = textarea.querySelector('textarea'),
            valueField = field.value

          if (field.hasAttribute('required')) {
            if (valueField === '') {
              error(textarea).set()
            } else {
              error(textarea).remove()
            }
          }
        },
        validateInput = input => {
          const field = input.querySelector('input'),
            name = field.getAttribute('data-input-name'),
            valueField = field.value

          if (field.hasAttribute('required')) {
            if (valueField !== '') {
              switch (name) {
                case 'name':
                  if (
                    valueField.length >= 2 &&
                    valueField.match(dataReqexp.personName)
                  ) {
                    error(input).remove()
                  } else {
                    error(input, 'Введите корректное имя').set()
                  }
                  break
                case 'email':
                  if (valueField.match(dataReqexp.email)) {
                    error(input).remove()
                  } else {
                    error(input, 'Введите корректный E-mail').set()
                  }
                  break
                case 'phone':
                  if (valueField.length === 18) {
                    error(input).remove()
                  } else {
                    error(input, 'Введите полный номер телефона').set()
                  }
                  break
                default:
                  if (valueField.length !== 0) {
                    error(input).remove()
                  } else {
                    error(input).set()
                  }
              }
            } else {
              error(input).set()
            }
          }
        },
        checkFields = () => {
          inputs.forEach(input => {
            validateInput(input)
          })
        },
        lifeValidate = () => {
          inputs.forEach(input => {
            input.addEventListener('click', () => {
              if (form.getAttribute('data-validate')) {
                const field = input.querySelector('input')

                field.addEventListener('input', () => validateInput(input))
                checkFields()
              }
            })
          })
        },
        validate = () => {
          let errors = 0

          inputs.forEach(input => {
            if (input.classList.contains('input--error')) errors += 1
          })

          const formBody = form.querySelector('.form__body')
          const successMsg = form.querySelector('.form__success')
          const errorMsg = form.querySelector('.form__error')

          if (errors === 0) {
            const isConfiguratorForm = form.hasAttribute(
              'data-configurator-form',
            )

            if (isConfiguratorForm) {
              const dataFromConfig = document.querySelector('.js-data')
              const formData = new FormData()

              // основные данные
              formData.append(
                'height',
                dataFromConfig.querySelector('.js-data-height-value')
                  .textContent,
              )
              formData.append(
                'depth',
                dataFromConfig.querySelector('.js-data-depth-value')
                  .textContent,
              )
              formData.append(
                'frontDoor',
                dataFromConfig.querySelector('.js-front-door-value')
                  .textContent,
              )
              formData.append(
                'backDoor',
                dataFromConfig.querySelector('.js-back-door-value').textContent,
              )
              formData.append(
                'execution',
                dataFromConfig.querySelector('.js-data-execution-value')
                  .textContent,
              )
              formData.append(
                'color',
                dataFromConfig.querySelector('.js-data-color-value')
                  .textContent,
              )

              // Добавляем аксессуары
              const sliderAccessories = Array.from(
                dataFromConfig.querySelectorAll(
                  '.js-data-accessorises-slider .swiper-slide .accessorises__item-name',
                ),
              ).map(slide => slide.textContent.trim())
              const checkboxAccessories = Array.from(
                dataFromConfig.querySelectorAll(
                  '.js-data-accessorises-checkboxes .checkbox__text',
                ),
              ).map(text => text.textContent.trim())

              formData.append(
                'accessories[slider]',
                JSON.stringify(sliderAccessories).replace(/\\/g, ''),
              )
              formData.append(
                'accessories[checkboxes]',
                JSON.stringify(checkboxAccessories).replace(/\\/g, ''),
              )

              // Добавляем контактные данные (имя, телефон, email)
              const formInputs = form.querySelectorAll('input')
              formInputs.forEach(input =>
                formData.append(input.name, input.value),
              )

              console.table(Object.fromEntries(formData))

              const configuratorForm = document.querySelector(
                '.configurator__slider',
              )
              const configurator = document.querySelector('.configurator')
              const stepCounter = document.querySelector('.configurator__step')

              const successMsg = configurator.querySelector('.js-form-success')
              const errorMsg = configurator.querySelector('.js-form-error')

              const hideForm = () => {
                configuratorForm.remove()
                stepCounter.remove()
                configurator.scrollIntoView({
                  behavior: 'instant',
                  block: 'center',
                })
              }

              $.ajax({
                type: 'POST',
                url: form.getAttribute('action') + '?ajax=Y',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                  hideForm()
                  successMsg.style.display = 'block'
                },
                error: function (error) {
                  hideForm()
                  errorMsg.style.display = 'block'
                  console.error(
                    'Ошибка при отправке формы: ',
                    error.responseText,
                  )
                },
              })
            } else {
              const formData = new FormData()
              const formInputs = form.querySelectorAll('input')
              formInputs.forEach(input =>
                formData.append(input.name, input.value),
              )

              console.table(Object.fromEntries(formData))

              $.ajax({
                type: 'POST',
                url: form.getAttribute('action') + '?ajax=Y',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                  formBody.classList.add('hidden')
                  successMsg.style.display = 'flex'
                },
                error: function (error) {
                  formBody.classList.add('hidden')
                  errorMsg.style.display = 'flex'
                  console.error(
                    'Ошибка при отправке формы: ',
                    error.responseText,
                  )
                },
              })
            }
          }
        }

      lifeValidate()
      checkFields()
      form.setAttribute('data-validate', 'true')
      validate()
    })
  })
}
