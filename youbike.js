document.addEventListener('DOMContentLoaded', ()=>{
  const url = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
  const rawData = []
  const searchDistrict = document.querySelector('#search_input_disc')
  const searchkeyword = document.querySelector('#search_input_txt')
  const itemsBox = document.querySelector('#itemsBox')
  const searchBtn = document.querySelector('#searchbtn')

  // fetch(url)
  //   .then(res => res.json())
  //   .then (data => {
  //     rawData.push(...data)
  //   })

  async function fetchData() {
    try{
      const response = await fetch(url)
      const data = await response.json()
      rawData.push(...data)
    } catch (err) {
      console.log(err);
    }
  }
    
  fetchData()
    
  // console.log(rawData);

  function findMatch(district, keyword, rawData) {
    if (district === '' && keyword ==='') {
      alert('請選擇行政區或輸入街道關鍵字')
    } else {
      return rawData.filter(spot => {
        if (district && keyword==='') {
          return spot.sarea === district
        } else if (district==='' && keyword){
          return spot.ar.includes(keyword)
        } else {
          return spot.sarea === district && spot.ar.includes(keyword)
        }
      })
    }
  }

  function displaySpot(e){
    itemsBox.textContent = ''
    const filteredData = findMatch(searchDistrict.value, searchkeyword.value, rawData)
    // if (filteredData.length === 0) {
    //   itemsBox.textContent = `抱歉！查無符合條件之站名。 請重新選擇行政區或輸入街道關鍵字`
    // }
    // 為什麼會吃掉在findMatch裡面itemsBox.textContent = '請選擇行政區或輸入街道關鍵字'的結果？？
    for (let i = 0; i < filteredData.length; i++) {
      const eachStationContainer = document.createElement('div')
      eachStationContainer.classList.add('col-12','col-md-6', 'col-lg-4')
      
      const each_station = document.createElement('table')
      each_station.classList.add('eachStation')

      const stationNameBox = document.createElement('tr')
      const stationName = document.createElement('td')
      stationName.textContent = filteredData[i].sna.slice(11)
      stationName.setAttribute('colspan', '2')
      stationName.classList.add('stationName')
      stationNameBox.append(stationName)

      const addressNameBox = document.createElement('tr')
      const addressName = document.createElement('td')
      addressName.textContent = `(${filteredData[i].sarea}) ${filteredData[i].ar}`
      addressName.setAttribute('colspan', '2')
      addressName.classList.add('addressName')
      addressNameBox.append(addressName)

      const quantityNameBox = document.createElement('tr')
      const totalQuantityName = document.createElement('td')
      totalQuantityName.textContent = '總停車格'
      totalQuantityName.classList.add('setEven')
      const availableQuantityName = document.createElement('td')
      availableQuantityName.textContent = '目前車輛數量'
      availableQuantityName.classList.add('setEven', 'addBorder')
      quantityNameBox.append(totalQuantityName,availableQuantityName)

      const quantityBox = document.createElement('tr')
      const totalQuantity = document.createElement('td')
      totalQuantity.textContent = filteredData[i].tot
      totalQuantity.classList.add('setEven')
      const availableQuantity = document.createElement('td')
      availableQuantity.textContent = filteredData[i].sbi
      if (filteredData[i].sbi === 0) {
        availableQuantity.classList.add('unavailable')
      }
      availableQuantity.classList.add('setEven', 'addBorder')
      quantityBox.append(totalQuantity,availableQuantity)

      const updatedTimeNameBox = document.createElement('tr')
      const updatedTime = document.createElement('td')
      updatedTime.textContent = `資料更新時間 ${filteredData[i].mday}`
      updatedTime.setAttribute('colspan', '2')
      updatedTimeNameBox.append(updatedTime)

      each_station.append(stationNameBox, addressNameBox, quantityNameBox, quantityBox, updatedTimeNameBox)
      eachStationContainer.append(each_station)
      itemsBox.append(eachStationContainer)
    }
    if (itemsBox.textContent === '') {
      alert('抱歉！查無符合條件之站名。 請重新選擇行政區或輸入街道關鍵字')
    }
    searchDistrict.value = ''
    searchkeyword.value = ''
  }

  searchBtn.addEventListener('click', displaySpot)

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

})

function initMap() {
  // The location of Uluru
  const uluru = { lat: 25.02605, lng: 121.5436 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

// act: "1"
// ar: "復興南路二段235號前"
// aren: "No.235， Sec. 2， Fuxing S. Rd."
// bemp: 23
// infoDate: "2022-03-05"
// infoTime: "2022-03-05 17:56:11"
// lat: 25.02605
// lng: 121.5436
// mday: "2022-03-05 17:56:11"
// sarea: "大安區"
// sareaen: "Daan Dist."
// sbi: 5
// sna: "YouBike2.0_捷運科技大樓站"
// snaen: "YouBike2.0_MRT Technology Bldg. Sta."
// sno: "500101001"
// srcUpdateTime: "2022-03-05 17:58:12"
// tot: 28
// updateTime: "2022-03-05 17:58:23"