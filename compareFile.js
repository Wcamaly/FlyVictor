var comprareFile = function(a,b){
	var A = a;
	var B = b;
	var I = [];
	var cadena= "";
	function compareInd(valor){
		if (I.length != 0){
			var aux = I[I.length-1];
			if (aux[0] < valor[0] && aux[1]>valor[1])
				I[I.length-1]= valor;
			else if (aux[0]<valor[0] && aux[1]<valor[1])
				I.push(valor);
		}else
			I.push(valor); 

	}
	function createInd(){
		var i,j;
		for (i=0; i < A.length;i++){
			j=0;
			while (j < B.length && A[i] != B[j])
				j++;
			if (A[i]  == B[j]){
				var valor = [i,j];
				compareInd(valor);
			}
		}
	}
	function walkArray(InA, InB,desA,desB){
		if (desA == InA && desB == InB) 
			return
		if (desA == InA && desB < InB) 
		{
			cadena += "+ "+B[desB]+"\n";
			walkArray(InA, InB,desA,desB+1);
			
		}
		if (desA < InA && desB == InB) 
		{
			cadena += "- "+A[desA]+"\n";
			walkArray(InA, InB,desA+1,desB);
			
		}
		if (desA < InA && desB < InB) 
		{
			cadena += A[desA]+" *| "+B[desB]+"\n";
			walkArray(InA, InB,desA+1,desB+1);
			
		}

	}

	this.fileCompare = function(){
		createInd();
		for (var i=0; i < I.length; i++){
			var desA = I[i-1] != null ? I[i-1][0]+1 : 0;
			var desB = I[i-1] != null ? I[i-1][1]+1 : 0;
			walkArray(I[i][0],I[i][1],desA,desB);
			cadena += A[I[i][0]]+"\n";
		}
		var desA =I[I.length-1] != null ?I[I.length-1][0]+1 :0;
		var desB= I[I.length-1] != null ?I[I.length-1][1]+1 :0;
		walkArray(A.length,B.length,desA,desB);
		return cadena;
	}


	return this;
}
module.exports = comprareFile;