var hm=document.getElementsByTagName('a')
    hm[2].style.borderBottom='5px solid #d81110'
    hm[1].style.border='none'
    hm[0].style.border='none'

dict={}
data=async()=>{
    dd=await fetch("http://127.0.0.1:8000/dataapi/")
    var d=await dd.json()
    console.log(d);
    option=document.getElementById('datasetplot')
    ss=document.createElement('option')
    ss.innerHTML="select"
    option.appendChild(ss) 
    dataset=document.getElementById('dataset') 
    ss=document.createElement('option')
    ss.innerHTML="select"
    dataset.appendChild(ss) 
    d.forEach(e => {
        x=e.file_name.split('/')
        x=x[x.length-1]
        arrford=[]
        for(i in e){
            if (i.includes('column') && e[i]!=""){
            arr=[]
            c2=e[i].slice(1,-1).split(',')
            c2.forEach(e=>{
                arr.push(parseFloat(e))
            })
            arrford.push(arr)
        }
        if(i=='col' ){
            c=e[i].slice(1,-1).replaceAll('"',"").replaceAll(" ","").replaceAll("[]","").replaceAll("'","").split(",")

        }
        }
        console.log(arrford);
        dictarry=[c]
        for (i=0;i<arrford.length;i++){
            dictarry.push(arrford[i])
        }
        dict[x]=dictarry

        se=document.createElement('option')
        se.setAttribute('value',x)
        se.innerHTML=x 
        option.appendChild(se)  
        
        sss=document.createElement('option')
        sss.setAttribute('value',x)
        sss.innerHTML=x 
        dataset.appendChild(sss)
        
    });
    console.log(dict);
}
data()

function onselcmpt(){
    data=document.getElementById('dataset').value
    x=dict[data][0]
    d1=document.getElementById('c1optioncmp')
    d1.innerHTML=""
    x.forEach(i=>{
        xaxis=x.indexOf(i)+1
        if (!dict[data][xaxis].includes(NaN)){
        se=document.createElement('option')
        se.setAttribute('value',i)
        se.innerHTML=i 
        d1.appendChild(se)
        }
        
    })
}
function agg(){
    data=document.getElementById('dataset').value
    col=document.getElementById('c1optioncmp').value
    oper=document.getElementById('operation').value
    val=dict[data]
    xaxis=val[0].indexOf(col)+1
    funvalue=document.getElementById('funvalue')
    if(oper=='min'){
        val=Math.min(...val[xaxis])
        funvalue.innerHTML=val
    }else if(oper=='max'){
        val=Math.max(...val[xaxis])
        funvalue.innerHTML=val
    }else{
        val=val[xaxis].reduce((a,b)=>a+b,0)
        funvalue.innerHTML=val
    }
    return false
}

function onsel(){
    data=document.getElementById('datasetplot').value
    x=dict[data][0]
    console.log(x);
    d1=document.getElementById('c1option')
    d2=document.getElementById('c2option')
    d1.innerHTML=""
    d2.innerHTML=""
    x.forEach(i=>{
        xaxis=x.indexOf(i)+1
        if (!(dict[data][xaxis].includes(NaN))){
        se=document.createElement('option')
        se.setAttribute('value',i)
        se.innerHTML=i 
    d1.appendChild(se)}
    if (!(dict[data][xaxis].includes(NaN))){
        se=document.createElement('option')
        se.setAttribute('value',i)
        se.innerHTML=i 
    d2.appendChild(se)}
    })

}

function plot(){
    k=document.getElementById('datasetplot').value
    grp=document.getElementById('grp')
    dataset=dict[k]
    // console.log(dict[k][0],dict[k][1]);
    d1=document.getElementById('c1option').value
    d2=document.getElementById('c2option').value
    xaxis=dataset[0].indexOf(d1)+1
    yaxis=dataset[0].indexOf(d2)+1
    grp.style.border="2px solid #6dece0";
    console.log(grp);
    var traceA={
        type:'scatter',
        mode:'markers',
        x:dataset[xaxis] ,
        y:dataset[yaxis],
        marker:{symbol:'circle',size:5}}
    var data=[traceA]
    var layout={xaxis: {range:[Math.min(...dataset[xaxis]),Math.max(...dataset[xaxis])], linecolor:'black',linewidth:2, title: d1},
    yaxis: {range:[Math.min(...dataset[yaxis]),Math.max(...dataset[yaxis])],linecolor:'black',linewidth:2, title: d2},
        title:`${d1} v/s ${d2}`
    }
    Plotly.newPlot(grp,data,layout);
    return false
}
