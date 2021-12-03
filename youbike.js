const youbike_list = document.querySelector('.youbike_list')
const searchbtn = document.querySelector('#searchbtn')

const Y = fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
.then(function(response){
  return response.json();
})

Y.then(function(result){
  //searchbtn按下時，所選到的行政區
  searchbtn.addEventListener("click", function(e) {
    const search_input_disc = document.querySelector('#search_input_disc')
    const input_disc_value = search_input_disc.value;
    // 只顯示被選取到的行政區資訊
    const selected_area = result.filter(function(e){
      if (input_disc_value === e.sarea){
        return e
      }
    })
    // 
    selected_area.forEach(function(station_info){
      const each_station = document.createElement('div')
      each_station.className = 'each_station'
      youbike_list.append(each_station)
      //場站站名  
      const name = document.createElement('li')
      name.textContent = `場站站名：${station_info.sna}`
      each_station.append(name)
      //場站區域
      const area = document.createElement('li')
      area.textContent = `場站區域：${station_info.sarea}`
      each_station.append(area)
      //場站地址
      const address = document.createElement('li')
      address.textContent = `場站地址：${station_info.ar}`
      each_station.append(address)
      //可用Youbike
      const bike_available = document.createElement('li')
      bike_available.textContent = `可用Youbike：${station_info.sbi}`
      each_station.append(bike_available)
      //停車格總數
      const parking = document.createElement('li')
      parking.textContent = `停車格總數：${station_info.tot}`
      each_station.append(parking)
      //可用停車格
      const parking_available = document.createElement('li')
      parking_available.textContent = `可用停車格：${station_info.bemp}`
      each_station.append(parking_available)
    })
  })
})

// sno(站點代號) =>station
// sna(場站中文名稱) =>name
// tot(場站總停車格) =>parking_total_num
// sbi(場站目前車輛數量) =>bike_available_num
// sarea(場站區域) =>area
// ar(地點) =>address
// bemp(空位數量) =>parking_available_num