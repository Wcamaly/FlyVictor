var diffLCS = function(){
	this.subcadena1= null;
	this.subcadena2= null;
	this.ocurrencia = "";
	this.GenerarDiff = function(text1,text2){
		this.subcadena1 = text1;
		this.subcadena2 = text2;

		var  m,n,i,j;
    	m=text1.length-1;
    	n=text2.length-1;

    	// Creat Matriz Dinamic
    	var c = new Array(m+1);
    	for (var r=0; r < c.length ; r++)
    		c[r] = new Array(n+1);
    	var b = new Array(m+1);
    	for (var z=0; z < b.length ; z++)
    		b[z] = new Array(n+1);


    	// Inizilize Matriz

    	for(i=1; i<=m; i++)
        	c[i][0]=0;
	    for(j=0; j<=n; j++)
    	    c[0][j]=0;

    	// Complete Matriz
    	for(i=1; i<=m; i++)
		{
		    for(j=1; j<=n; j++)
		    {
		        if (text1[i]==text2[j])
		        {
		            c[i][j]=c[i-1][j-1]+1;
		            b[i][j]='/';
		        }
		        else
		       {
		            if (c[i-1][j]>=c[i][j-1])
		            {
		                c[i][j]=c[i-1][j];
		                b[i][j]='|'; 
		            }
		            else
		            {
		                c[i][j]=c[i][j-1];
		                b[i][j]='-'; 
		            }
			    }
		    } 
		}
		console.log('------------------------------------------');

		for(var t=1 ; t <= m; t++){
			for(var g=0; g<= n ;g++){
				console.log( b[t][g] );
				
			}
			console.log('\n');
			
		}

		console.log('------------------------------------------');







		// Anlize Matriz
		imprimir_LCS(b,text1,text2,m,n);
	}


	function imprimir_LCS(b,text1,text2, i,  j) // Print Ocurren the A in B
	{
  
	    if (i > 0 && j>0 && b[i][j]=='/')
	    {
	        imprimir_LCS(b,text1,text2,i-1,j-1);
	        console.log(" "+ text1[i] +"\n");
	        this.ocurrencia +=" "+ text1[i] +"\n";
	    }
	    else if (i>0 && j==0 || b[i][j]=='|'){
            	imprimir_LCS(b,text1,text2,i-1,j);
            	this.ocurrencia +="-"+ text1[i] +"\n";
            	console.log("-"+ text1[i] +"\n");

		}else if (i==00 && j>0 || b[i][j]=='-'){ // "-"
		        imprimir_LCS(b,text1,text2,i,j-1);
		        this.ocurrencia +="+"+ text2[j] +"\n";
		        console.log("+"+ text2[j] +"\n");
		}else
			return;
	}

	

	return this;
}
module.exports = diffLCS;