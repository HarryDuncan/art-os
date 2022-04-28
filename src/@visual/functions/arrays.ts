

export const create2DArray = (height : number, width : number, matrixItem?: any) => {
  var x = new Array(height);
  for (var i = 0; i < x.length; i++) {
    x[i] = new Array(width).fill(matrixItem? matrixItem : 0);
  }

  return x
}



export const createMatixPatter = (patternType : string, matrix : any) => {
  console.log('asdasd')
}
