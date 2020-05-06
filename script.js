var matrixInputs = [];

//создание инпутов для ввода матрицы
function createMatrixInputs(node) {
  matrixInputs = []
  
var size = document.getElementsByClassName("matrix-size")[0].value
  size = document.getElementsByClassName("matrix-size")[0].value 

  if(node.rows.length != 0) {
    for (var i = node.rows.length -1; i >= 0; i -= 1) {
      var row = node.deleteRow(i)
    }
  }


    for (var i = 0; i < size; i += 1) {
      var row = node.insertRow()
      var inputsRow = []
      matrixInputs.push(inputsRow)
      for (var j = 0; j < size; j += 1) {
        var cell = row.insertCell()
        cell.style.padding = '1px'
        var input = document.createElement('input')
        inputsRow.push(input)
        input.type = 'text'
        input.style.width = '18px'
        input.style.height = '18px'
        input.style.padding = '5px 10px';
        cell.appendChild(input)
      }
    }
    return matrixInputs
  }

  
  //получить значения матрицы
function getMatrixValues(matrixInputs) {
    var res = []
    for (var i = 0; i < matrixInputs.length; i += 1) {
        var inputsRow = matrixInputs[i]
        var valuesRow = []
        for (var j = 0; j < inputsRow.length; j += 1) {
            var input = inputsRow[j]
            var valueNum = parseFloat(input.value)
            if (isNaN(valueNum)) {
                valueNum = 0
            }
            valuesRow.push(valueNum)
        }
        res.push(valuesRow)
    }
    return res
}

function outConsole() {
    var matrix = getMatrixValues(matrixInputs)
    console.log('matrix', matrix)
}

function search_path() 
{ 

  var matrix = getMatrixValues(matrixInputs);
  var size = document.getElementsByClassName("matrix-size")[0].value;
  // var matrix = [
  //   [0,-1,4,99,99],
  //   [99,0,3,2,2],
  //   [99,99,0,99,99],
  //   [99,1,5,0,99],
  //   [99,99,99,-3,0]
  // ];
  // var size = 5;
  var graph = [];

  var k = 0;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (matrix[i][j] != 0 && matrix[i][j] != 99) {
        graph[k] = new Array;
        graph[k][0] = i;
        graph[k][1] = j;
        graph[k][2] = matrix[i][j];
        k++;
      }
    }
  }

  var V = size;
  var E = graph.length
  console.log('V', V)
  console.log('E', E)
  console.log('g', graph)

  var paths = [];
  var  p;

  for (var i = 0; i < size; i++) {
    paths[i] = BellmanFord(graph, V, E, i);
  }

  console.log(paths)

  
  var node = document.querySelector('.dataEntry');

  if(node.rows.length != 0) {
    for (var i = node.rows.length -1; i >= 0; i -= 1) {
      var row = node.deleteRow(i)
    }
  }

  for (var i = 0; i < size; i++) {
    var row = node.insertRow()
    var inputsRow = []
    matrixInputs.push(inputsRow)
    for (var j = 0; j < paths.length; j++) {
      var cell = row.insertCell()  
      var number = document.createTextNode(paths[i][j])
      cell.style.border = '1px solid black'
      // if (paths[i][j] == 99) {
      //   cell.style.backgroundColor = '#ff4848';
      // } else if (paths[i][j] == 0) {
      //   cell.style.backgroundColor = '#4d84ff';
      // } else {
      //   cell.style.backgroundColor = '#37ff37';
      // }
      cell.appendChild(number)
    }
  }

} 

function BellmanFord(graph, V, E, src) {
  var dis = [V]; 
  for (var i = 0; i < V; i++) 
    dis[i] = Number.MAX_VALUE; 

  dis[src] = 0; 

  for (var i = 0; i < V - 1; i++) { 
    for (var j = 0; j < E; j++) { 
      if (dis[graph[j][0]] + graph[j][2] < dis[graph[j][1]]) 
        dis[graph[j][1]] = dis[graph[j][0]] + graph[j][2]; 
    } 
  } 

  for (var i = 0; i < E; i++) { 
    var x = graph[i][0]; 
    var y = graph[i][1]; 
    var weight = graph[i][2]; 
    if (dis[x] != Number.MAX_VALUE && dis[x] + weight < dis[y]) 
      console.log("Graph contains negative weight cycle")
  } 

  for (var i = 0; i < V; i++) {
      if(dis[i] > 99) {
        dis[i] = 99;
      }
  }

  return dis;
} 


