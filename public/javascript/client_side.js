$(window).on('load', function() {
  $('#enableEthereumButton').on('click', () => {  
    ethereum.request({ method: 'eth_requestAccounts' });
  })
  
  const getAccount =  async () => {
    try {
      let result;
      const currentAccount = await ethereum.request({
        method: 'eth_accounts'
    })
    result = currentAccount;
    $('#account').text(result);
    return result;
    } catch (e) {
      $('#account').text(e.message);;
    }
    return currentAccount;   
  }
  const getBalance = async () => {
    const currentAccount = await getAccount();    
    try {
      let result;
      const balance = await ethereum.request({
          method: 'eth_getBalance',
          params: currentAccount
        })      
      result = parseInt(balance);           
      return result;
    } catch (e) {
      console.log(e);
    }    
  }    
  const getContAddress = async () => {
    let result;
    const contractAddress = await $.get('/nftAddress', (response) => {
      result = response;
      return result;
    })        
    return contractAddress;
  }
  const getContractOwner = async () => {
    let result;
    const contractOwner = await $.get('/contOwner', (response) => {
      result = response;
      return result;       
    })    
    return contractOwner;
  }      
  const getTokenOwned = async () => {
    let result;
    const tokenQtty = await $.post('/balanceOf', { tokenOwner: tokenOwner } , (response) => {
      result = response;
      return result;      
    })
    return tokenQtty;
  }
  let tokenId;
  const getTokenOwner = async () => {
    let result;
    const tokenOwner = await $.post('/ownerOf', { tokenId: tokenId }, (response) => {      
      result = response;
      return result;
    })
    return tokenOwner;
  }
  getAccount();
  
  $('.ethereumGetAccount').on('click', async () => { 
    const currentAccount = await getAccount();
    $('#account').text(currentAccount);  
  })    

  $('.ethereumGetBalance').on('click', async () => {          
      const balance = await getBalance();
      $('#balance').text(balance);
  }); 
      
  $('.contractAddress').on('click', async () =>{
    const contractAddress = await getContAddress();
    $('#contaddress').text(contractAddress)      
  })
  
  $('.nftName').on('click', () => {
    let NftName;
    $.get('/nftName', (response) => {
      NftName = response;
      $('#name').text(NftName);
    })
  })
  
  $('.nftSymbol').on('click', () => {
    let NftSymbol;
    $.get('/nftSymbol', (response) => {
      NftSymbol = response;
      $('#symbol').text(NftSymbol);
  
    })
  })
      
  $('.contractOwner').on('click', async () => {
    const contractOwner = await getContractOwner();
    $('#contOwner').text(contractOwner);
  })
  
  $('#mint').on('click', async  () => {
    const [currentAccount, contractAddress, contractOwner] = await Promise.all([
      getAccount(),
      getContAddress(),
      getContractOwner() 
    ])              
    let accountTo = $('#Mintreceiver').val();    
    if(currentAccount[0].toLowerCase() !== contractOwner.toLowerCase()){
      $('#txMint'). text('Transaction caller is not Contract Owner!')
    } else {
      $.post('/mint', { 
        accountTo: accountTo, 
        accountFrom: currentAccount[0], 
        contractAddress: contractAddress 
      }, async (response) => {        
        try {
          const txHashMint = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [response],
          })                              
          $('#txMint').text(txHashMint);
        } catch (e) {
          $('#txMint').text(e.message);
        }                
      })
    }
  })

  $('#burn').on('click', async () => {
    tokenId = $('#burnTokenId').val();
    const [currentAccount, contractAddress, tokenOwner] = await Promise.all([
      getAccount(),
      getContAddress(),    
      getTokenOwner()
    ])
    if(tokenOwner.toLowerCase() !== currentAccount[0].toLowerCase()){
      $('#txburn').text('You are not the token Owner')
    } else {
      $.post('/burn', { 
        tokenId: tokenId, 
        currentAccount: currentAccount[0], 
        contractAddress: contractAddress 
      }, async (response) => {
        try {
          const txHashBurn = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [response],
          })                              
          $('#txburn').text(txHashBurn);
          $('#tokenOwner').text('');
          document.getElementById('tokenIdOwned').value = '';
        } catch (e) {
          $('#txburn').text(e.message);
        } 
      })
    }    
  })

  $('.balandeOf').on('click', async () => {
    tokenOwner = $('#tokenOwnerAddress').val();
    const tokenQtty = await getTokenOwned();
    $('#tokenQtty').text(tokenQtty)
  })
      
  $('.ownerOf').on('click', async () => {
    tokenId = $('#tokenIdOwned').val();
    const tokenOwner = await getTokenOwner();
    $('#tokenOwner').text(tokenOwner);    
  })
  
  $('#safeTransferFrom').on('click', async () => {
    tokenId = $('#transferTokenId').val();
    const [currentAccount, contractAddress, tokenOwner] = await Promise.all([
      getAccount(),
      getContAddress(),    
      getTokenOwner()
    ]) 
    let accountTo = $('#transferAccountTo').val();
    let accountFrom = $('#transferAccountFrom').val();   
    if(currentAccount[0].toLowerCase() !== tokenOwner.toLowerCase()){
      $('#txTransfer').text('You are not the token Owner')
    } else {
      $.post('/safeTransferFrom', { 
        accountFrom: accountFrom, 
        accountTo: accountTo, 
        tokenId: tokenId, 
        currentAccount: currentAccount[0], 
        contractAddress: contractAddress}, async (response) => {
          try {
            let result;
            const txHashTransfer = await ethereum.request({
              method: 'eth_sendTransaction',
              params: [response],
            })
            result = txHashTransfer                             
            $('#txTransfer').text(result);            
          } catch (e) {
            $('#txTransfer').text(e.message);
          } 
        // if(response.tx == null){
        //   $('#txTransfer').text(response);
        // } else {
        //   $('#txTransfer').text(response.tx); 
        // }
      })
    }

  })
  
  $('#approveTo').on('click', async () => {
    const currentAccount = await getAccount();
    let approveTo = $('#approveAccountTo').val();
    let tokenId = $('#approveTokenId').val();    
    $.post('/approveTo', { approveTo: approveTo, tokenId: tokenId, currentAccount: currentAccount}, (response) => {
      if(response.tx == null){
        $('#txApprove').text(response);
      } else {
        $('#txApprove').text(response.tx); 
      }
    })
  })  

})



// let currentAccount;
  // const getAccount = () => {           
  //   ethereum.request({ 
  //     method: 'eth_accounts'
  //   }).then((result) => {
  //     currentAccount = result[0];
  //     $('#account').text(currentAccount);                
  //   }).catch((e) => {
  //     console.log(e);
  //   })
  //   return currentAccount;      
  // }