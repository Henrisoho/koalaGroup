console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  setupClickListeners()
  getKoalas();
  $('body').on('click', '.transferButton', transferKoalaY);
  $('body').on('click', '.untransferButton', transferKoalaN);
  $('body').on('click', '.deleteButton', deleteKoala);
}); // end doc ready

//CREATE KOALA
function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

//KOALA RENDER
function getKoalas(){
  console.log( 'in getKoalas' );
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response) {
    $('#viewKoalas').empty();
    for (let koala of response) {
      if(koala.ready_to_transfer == 'Y'){
      $('#viewKoalas').append(`
        <tr>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td><button data-id=${koala.id} class="untransferButton">unReady To Transfer</button></td>
          <td><button data-id=${koala.id} class="deleteButton">Delete</button></td>
        </tr>
    `);
      }else{
        $('#viewKoalas').append(`
        <tr>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>

          <td><button data-id=${koala.id} class="transferButton">Ready To Transfer</button></td>

          <td><button data-id=${koala.id} class="deleteButton">Delete</button></td>
        </tr>
    `);
      }
    console.log(koala.id)
    }
  }).catch(function(error){
    console.log('error in GET', error);
  });
} // end getKoalas


//KOALA POST ROUTE
function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
    }).then(function(response) {
      console.log('Response from server.', response);
      getKoalas();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add koala at this time. Please try again later.');
    });
}

//UPDATE TRANSFER STATUS
function transferKoalaY() {
  let idToUpdate = $(this).data().id;
  
  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      ready_to_transfer: 'Y'
    }
  }).then((response) => {
    console.log(idToUpdate)
    getKoalas();
  }).catch((error) => {
    console.log(error);
  })
}

function transferKoalaN() {
  let idToUpdate = $(this).data().id;
  
  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      ready_to_transfer: 'N'
    }
  }).then((response) => {
    console.log(idToUpdate)
    getKoalas();
  }).catch((error) => {
    console.log(error);
  })
}

//DELETE KOALAS
function deleteKoala() {
  let idToDelete = $(this).data().id;

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`
  }).then((response) => {
    getKoalas();
  }).catch((error) => {
    console.log('deleteCreature() sure broke:', error);
  })
}