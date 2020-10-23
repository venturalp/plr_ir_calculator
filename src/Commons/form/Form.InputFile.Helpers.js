import { isValidSize } from 'Commons/files/Files.Helper'

export const validateExtension = (fileName, typesAllowed = ['*.*']) => {
  if (typesAllowed.includes('*.*')) return true
  const extension = fileName.substr(fileName.lastIndexOf('.')).toLowerCase()

  return typesAllowed.includes(extension)
}

export const getValidationMessages = (
  fileList,
  maxSizeMB,
  typesAllowed,
  multiple,
) => {
  if (fileList.length > 1 && !multiple) {
    return 'Arraste apenas 1 arquivo'
  }
  if (
    Array.prototype.filter.call(
      fileList,
      file => !isValidSize(file.size, maxSizeMB * 1024),
    ).length > 0
  ) {
    return `Tamanho máximo do arquivo: ${maxSizeMB}mb`
  }
  if (
    Array.prototype.map
      .call(fileList, file =>
        validateExtension(file.name, typesAllowed) ? file.name : null,
      )
      .filter(file => file !== null).length === 0
  ) {
    return 'Tipo de arquivo não permitido'
  }

  return ''
}
