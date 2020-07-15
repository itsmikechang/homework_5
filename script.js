$(document).ready(function() {
  
  const currentDate = moment().format('dddd, MMMM Do YYYY');

  let am12 = moment().format('H');
  let pm12 = moment().format('h');

  let $dateHeading = $('#navbar-date');
  $dateHeading.text(currentDate);

  const currentHour = false; 
  
  if (currentHour) {
    am12 = 13;
    pm12 = 1;
  }
  
  const saveIcon = "./images/save-regular.svg"; 

  let dataEntry = JSON.parse(localStorage.getItem("dataEntry"));

  if (dataEntry !== null) {
    dataArr = dataEntry;
  } else {
    dataArr = new Array(9);
  }

  let $plannerDiv = $('#plannerContainer');
  $plannerDiv.empty();

  for (let hour = 9; hour <= 17; hour++) {
    let index = hour - 9;
    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);

    let $timeDiv = $('<div>');
    $timeDiv.addClass('col-md-2');

    const $timeBoxSpn = $('<span>');
    $timeBoxSpn.attr('class','timeBox');
    
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    $timeBoxSpn.text(`${displayHour} ${ampm}`);
    $rowDiv.append($timeDiv);
    $timeDiv.append($timeBoxSpn);


    let $dataEntrySpan = $('<input>');

    $dataEntrySpan.attr('id',`input-${index}`);
    $dataEntrySpan.attr('hour-index',index);
    $dataEntrySpan.attr('type','text');
    $dataEntrySpan.attr('class','dailyEntry');
    $dataEntrySpan.val( dataArr[index] );

    let $colEntryDiv = $('<div>');
    $colEntryDiv.addClass('col-md-9');
    $rowDiv.append($colEntryDiv);
    $colEntryDiv.append($dataEntrySpan);

    let $colSaveDiv = $('<div>');
    $colSaveDiv.addClass('col-md-1');

    let $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    $rowDiv.append($colSaveDiv);
    $colSaveDiv.append($saveBtn);
   
    updateRowColor($rowDiv, hour);
    
    $plannerDiv.append($rowDiv);
  };

  function updateRowColor ($hourRow,hour) { 

    if ( hour < am12) {
      $hourRow.css("background-color","lightgrey")
    } else if ( hour > am12) {
      $hourRow.css("background-color","lightgreen")
    } else {
      $hourRow.css("background-color","red")
    }
  };

  $(document).on('click','i', function(event) {
    event.preventDefault();  

    let $index = $(this).attr('save-id');
    let inputId = '#input-'+$index;
    let $value = $(inputId).val();
    dataArr[$index] = $value;

    localStorage.setItem("dataEntry", JSON.stringify(dataArr));
  });  
});