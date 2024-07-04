window.onload = function() {
    fetchDataUsingThen();
    // OR
    // fetchDataUsingAsyncAwait();
  };
  
  function fetchDataUsingThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then((data) => {renderTable(data)
            window.cryptoData = data;})
      .catch(error => console.error('Error fetching data:', error));
  }
  
  async function fetchDataUsingAsyncAwait() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      window.cryptoData = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function renderTable(data) {
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';
  
    data.forEach(coin => {
      const row = document.createElement('tr');
      if(coin.price_change_percentage_24h>0){
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}" width="24"></td>  
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
            <td class="green">${coin.price_change_percentage_24h}%</td>
            <td>${coin.market_cap}</td>
        `;
      tableBody.appendChild(row);
      }
      else if(coin.price_change_percentage_24h<0){
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}" width="24"></td>  
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
            <td class="red">${coin.price_change_percentage_24h*(-1)}%</td>
            <td>${coin.market_cap}</td>
        `;
      tableBody.appendChild(row);
      }
    });
  }
  
  function searchCrypto() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('tr');
  
    rows.forEach(row => {
      const name = row.children[1].textContent.toLowerCase();
      const symbol = row.children[2].textContent.toLowerCase();
      if (name.includes(input) || symbol.includes(input)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  let isSortedAsc = true;
  function sortCrypto() {
    if (window.cryptoData) {
      window.cryptoData.sort((a, b) => {
        if (isSortedAsc) {
          return b.market_cap - a.market_cap;
        } else {
          return a.market_cap - b.market_cap;
        }
      });
      console.log('Sorted data:', window.cryptoData); // Debug log
      renderTable(window.cryptoData);
      isSortedAsc = !isSortedAsc;
    } else {
      console.error('No data available to sort.');
    }
  }

  function sortCrypto1() {
    if (window.cryptoData) {
      window.cryptoData.sort((a, b) => {
        if (isSortedAsc) {
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        } else {
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        }
      });
      console.log('Sorted data:', window.cryptoData); // Debug log
      renderTable(window.cryptoData);
      isSortedAsc = !isSortedAsc;
    } else {
      console.error('No data available to sort.');
    }
  }
  document.getElementById('searchInput').addEventListener('change', searchCrypto);
  
  document.getElementById('sortButton').addEventListener('click', sortCrypto);

  document.getElementById('sortButton2').addEventListener('click', sortCrypto1);
  