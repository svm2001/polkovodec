interface RadioClickProcessingProps<T extends HTMLElement> {
  blockName: T | null
  radiosArray: NodeListOf<HTMLInputElement>
  attributeName: string
  nextStepAttribute?: string
}

export const radioClickProcessing = <T extends HTMLElement>(
  props: RadioClickProcessingProps<T>,
): void => {
  const {
    blockName,
    radiosArray,
    attributeName,
    nextStepAttribute = 'data-is-next-step',
  } = props

  if (blockName) {
    const noValid = blockName.getAttribute(nextStepAttribute) === 'false'
    radiosArray.forEach(radio => {
      radio.addEventListener('change', () => {
        noValid
          ? blockName.setAttribute(nextStepAttribute, String(radio.checked))
          : null
        const text = radio.nextElementSibling?.textContent || ''
        blockName.setAttribute(attributeName, text)
      })
    })
  }
}
