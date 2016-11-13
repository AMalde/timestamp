(function(){
    var express = require('express'),
        port    = 8080,
        app     = express()
    const path  = require('path');
    const moment = require('moment');    
    
     app.listen(port, function () {
      console.log('This API is running on port: '+ port); 
    });
    
    app.use(express.static('website'));

    app.get('/:timeStamp', sendTimestamp);
    
    function convertToNatural(unix){
      var months = ['Jan','Feb','Mar'
                   ,'Apr','May','Jun'
                   ,'Jul','Aug','Sep'
                   ,'Oct','Nov','Dec'],
                   
         year      = unix.getFullYear(),
         month     = months[unix.getMonth()],
         date      = unix.getDate(),
         formatted = month + ' ' + date + ', ' + year;
         
         return formatted; 
     }
     
     function convertToUnix(natural){
         natural = 0;
         var date = new Date(natural).getTime() / 1000; 
     }
     
     function dateIsValid(date) {
              // First check for the pattern
              console.log('date Testing')
        if(!/^\d{1,2}\s\d{1,2},\s\d{4}$/.test(date))
            return false;
    
        // Parse the date parts to integers
        var parts = date.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);
    
        // Check the ranges of month and year
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;
    
        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    
        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;
    
        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
     }
        
    function sendTimestamp (request, response) {
        var data          = request.params,
            unixTimestamp = new Date(data.timeStamp * 1000),
            validNatural,
            object = {};
        
        
        if(unixTimestamp.getDate() > 0){
            
            object = {
                unixTimestamp: data.timeStamp, 
                natural: convertToNatural(unixTimestamp)
            };
        }
        else if(dateIsValid(data.timeStamp)){
            
            object = {
                unixTimestamp: convertToUnix(data.timeStamp), 
                natural: data.timeStamp
            };
        }
        else{
            object = {
                unixTimestamp: null, 
                natural: null
            }
        }
            
            response.send(object);
           
           
         
        
        
    }
    
    
   
    
})();