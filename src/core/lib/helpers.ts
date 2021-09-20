class helpers {
  static dataIsoTo(dataVal: string, format: 'data' | 'time' | 'data&time') {
    if (format === 'data') {
      return dataVal.split('T')[0]
    } else if (format === 'time') {
      return dataVal.split('T')[1].replace('Z', '')
    } else if (format === 'data&time') {
      return `${dataVal.split('T')[0]} ${dataVal.split('T')[1].replace('Z', '')}`
    }
    return ''
  }
  static waitFor(delay: number) { return new Promise(resolve => setTimeout(resolve, delay)) };
}

export { helpers }