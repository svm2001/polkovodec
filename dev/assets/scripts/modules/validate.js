import $ from 'jquery'
export default function validate() {
  const forms = document.querySelectorAll('[data-validate]')

  if (!forms.length) return

  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      const inputs = form.querySelectorAll('.input'),
        textareas = form.querySelectorAll('.textarea'),
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
        checkingNumbers = (input, msg) => {
          const field = input.querySelector('input')
          if (field.value.match(dataReqexp.numbers)) {
            error(input).remove()
          } else {
            error(input, msg).set()
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

          textareas.forEach(textarea => {
            validateTextarea(textarea)
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
            if (input.classList.contains('input--error')) {
              errors += 1
            }
          })

          textareas.forEach(input => {
            if (input.classList.contains('textarea--error')) {
              errors += 1
            }
          })

          const formBody = form.querySelector('.form__body')
          const successMsg = form.querySelector('.form__success')
          const errorMsg = form.querySelector('.form__error')

          if (errors === 0) {
            let formData = $(form).serialize()
            console.log(formData)
            $.ajax({
              type: 'POST',
              url: form.getAttribute('action') + '?ajax=Y',
              data: formData,
              // beforeSend: function() {
              //   form.closest('.hystmodal__window').classList.add('loading');
              // },
              success: function (response) {
                formBody.classList.add('hidden')
                successMsg.style.display = 'flex'
              },
              error: function (error) {
                // formBody.classList.add('hidden')
                // successMsg.style.display = 'flex'
                formBody.classList.add('hidden')
                errorMsg.style.display = 'flex'
              },
            })
          }
        }

      lifeValidate()
      checkFields()
      form.setAttribute('data-validate', 'true')
      validate()
    })
  })
}
