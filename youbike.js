document.addEventListener('DOMContentLoaded', ()=>{
  const url = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
  const rawData = []
  const searchDistrict = document.querySelector('#search_input_disc')
  const searchkeyword = document.querySelector('#search_input_txt')
  const itemBox = document.querySelector('#itemBox')
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
      return rawData.filter(spot => {
        if (district && keyword==='') {
          return spot.sarea === district
        } else {
          return spot.ar.includes(keyword)
        }
      })
    }

    function displaySpot(e){
      const filteredData = findMatch(searchDistrict.value, searchkeyword.value, rawData)
      for (let i = 0; i < filteredData.length; i++) {
        const each_station = document.createElement('table')
        each_station.classList.add('col-12','col-md-6', 'col-lg-4', 'eachStation')

        const stationNameBox = document.createElement('tr')
        const stationName = document.createElement('td')
        stationName.textContent = filteredData[i].sna.slice(11)
        stationName.setAttribute('colspan', '2')
        stationName.classList.add('stationName')
        stationNameBox.append(stationName)

        const addressNameBox = document.createElement('tr')
        const addressName = document.createElement('td')
        addressName.textContent = filteredData[i].ar
        addressName.setAttribute('colspan', '2')
        addressNameBox.append(addressName)

        const quantityNameBox = document.createElement('tr')
        const totalQuantityName = document.createElement('td')
        totalQuantityName.textContent = '總停車格'
        totalQuantityName.classList.add('setEven')
        const availableQuantityName = document.createElement('td')
        availableQuantityName.textContent = '目前車輛數量'
        availableQuantityName.classList.add('setEven')
        quantityNameBox.append(totalQuantityName,availableQuantityName)

        const quantityBox = document.createElement('tr')
        const totalQuantity = document.createElement('td')
        totalQuantity.textContent = filteredData[i].tot
        totalQuantity.classList.add('setEven')
        const availableQuantity = document.createElement('td')
        availableQuantity.textContent = filteredData[i].sbi
        availableQuantity.classList.add('setEven')
        quantityBox.append(totalQuantity,availableQuantity)

        const updatedTimeNameBox = document.createElement('tr')
        const updatedTime = document.createElement('td')
        updatedTime.textContent = `資料更新時間 ${filteredData[i].mday}`
        updatedTime.setAttribute('colspan', '2')
        updatedTimeNameBox.append(updatedTime)

        each_station.append(stationNameBox, addressNameBox, quantityNameBox, quantityBox, updatedTimeNameBox)

        itemBox.append(each_station)
      }
    }

    searchBtn.addEventListener('click', displaySpot)

    
})

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