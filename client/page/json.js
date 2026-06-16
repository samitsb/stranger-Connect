<div>
<button id="fetchdata">Fetchd Data</button>
//<pre id="responseData"></pre>
<script>
  document.getElementById('fetchdata').addEventListener('click',function(){
    fetch('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=xml')
    .then(Response =>{
      if(!Response.ok){
        throw new Error('Network response was not ok');

      }
      return Response.json();//parse json
    })
    .then(data=>{
      console.log(data); //log to console
      document.getElementById('responseData').textContent=JSON.stringify(data,null,2);//Display on page

    })
  }) 
  
  
</script>
</div>