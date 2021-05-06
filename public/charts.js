google.charts.load('current', {packages: ['corechart']});
google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(
    function() { // Anonymous function that calls drawChart1 and drawChart2
         drawChart1();
        //  setTimeout (()=> {
        //     drawChart2();
        //  }, 3000)
         
      });
      function drawChart(data) {
        // alert("in Chart: data is: " + JSON.stringify(data) + ' calendarList ' + calendarList)
        let keys = Object.keys(data)
        let num1 = data [keys[1]];
        let num2 = data [keys[2]];
        let num3 = data [keys[3]];
        let num4 = data [keys[4]];
        let num5 = data [keys[5]];
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Calendar Name');
        data.addColumn('number', 'Hours Spent');

        data.addRows([
          [calendarList[0], num1],
          [calendarList[1], num2],
          [calendarList[2], num3],
          [calendarList[3], num4],
          [calendarList[4], num5]
        ]);
  
        // Set chart options
        var options = {'title':'How I Spent my Hours',
                       'width':400,
                       'height':300};
  
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('first-column'));
        chart.draw(data, options);

        data.sort({column: 1, desc: true});

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" }]);

      var barchart_options = {
        title: "Hours Spent doing: ",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
        
        var barchart = new google.visualization.BarChart(document.getElementById('third-column'));
        barchart.draw(view, barchart_options);
        let totalHoursLogged = num1 + num2 + num3 + num4 + num5
        document.getElementById('first-bottom-column').innerHTML =`total hours logged: ${totalHoursLogged.toFixed(2)}`
        // add productivity percentage
        if(productiveList.length) {
          let totalProductive = 0;
          if(productiveList.includes(calendarList[0].toLowerCase())) {
            totalProductive += num1;
          } 
          if(productiveList.includes(calendarList[1].toLowerCase())) {
            totalProductive += num2;
          } 
          if(productiveList.includes(calendarList[2].toLowerCase())) {
            totalProductive += num3;
          } 
          if(productiveList.includes(calendarList[3].toLowerCase())) {
            totalProductive += num4;
          }
          if(productiveList.includes(calendarList[4].toLowerCase())) {
            totalProductive += num5;
          }  
          totalProductive = (totalProductive/totalHoursLogged)*100
          document.getElementById('productivity-percentage').style.display = 'block'
          document.getElementById('productivity-percentage').innerHTML = totalProductive.toFixed(1) + '%';
        } 
        if(neutralList.length) {
          let totalNeutral = 0;
          if(neutralList.includes(calendarList[0].toLowerCase())) {
            totalNeutral += num1;
          } 
          if(neutralList.includes(calendarList[1].toLowerCase())) {
            totalNeutral += num2;
          } 
          if(neutralList.includes(calendarList[2].toLowerCase())) {
            totalNeutral += num3;
          } 
          if(neutralList.includes(calendarList[3].toLowerCase())) {
            totalNeutral += num4;
          }
          if(neutralList.includes(calendarList[4].toLowerCase())) {
            totalNeutral += num5;
          }  
          totalNeutral = (totalNeutral/totalHoursLogged)*100
          if(totalNeutral > 0) {
            document.getElementById('calc-neutrality').style.display = 'block'
            document.getElementById('neutrality-percentage').innerHTML = totalNeutral.toFixed(1) + '%';
          } else {
            document.getElementById('calc-neutrality').style.display = 'none'

          }
          
        }
        if (destructiveList.length) {
          let totalDestructive = 0;
          if(destructiveList.includes(calendarList[0].toLowerCase())) {
            totalDestructive += num1;
          } 
          if(destructiveList.includes(calendarList[1].toLowerCase())) {
            totalDestructive += num2;
          } 
          if(destructiveList.includes(calendarList[2].toLowerCase())) {
            totalDestructive += num3;
          } 
          if(destructiveList.includes(calendarList[3].toLowerCase())) {
            totalDestructive += num4;
          }
          if(destructiveList.includes(calendarList[4].toLowerCase())) {
            totalDestructive += num5;
          }  
          totalDestructive = (totalDestructive/totalHoursLogged)*100
          if(totalDestructive > 0) {
            // document.getElementById('calc-neutrality').style.display = 'block';
            document.getElementById('calc-destruction').style.display = 'block';
            document.getElementById('destruction-percentage').innerHTML = totalDestructive.toFixed(1) + '%';
          } else {
            document.getElementById('calc-destruction').style.display = 'none';
          }
        }
      
      }

      function drawChart1() {
        // var data = google.visualization.arrayToDataTable([
        //   ['Task', 'Hours per Day'],
        //   ['productive',     11],
        //   ['neutral',      2],
        //   ['destructing',  2]        
        // ]);

        // var options = {
        //   title: 'My Daily Activities',
        //   pieHole: 0.4,
        //   width:300,
        //   height: 200,
        //   legend: 'none'

        // };

        // // var chart = new google.visualization.PieChart(document.getElementById('second-column'));
        // chart.draw(data, options);
    }
//day1 -> adjusts to end of week date... same as algo in viewcalendar
    function dayAdjuster (dayId) {
      let day = new Date();
      let adjuster = dayId.slice(3);
      day = updateDate(oneWeek(day).weekEndDate, 1-parseInt(adjuster))
      return day;
    }

    function unplanned(day) {
      let num = 24
      if(day.Life) {
        num -= day.Life
      } 
      if(day.Entertainment) {
        num -= day.Entertainment
      } 
      if(day.MED) {
        num -= day.MED;
      } 
      if(day['Course Work']) {
        num -= day['Course Work'];
      }
      if(day.Language) {
        num -= day.Language
      } 
      if(num < 0) {
        return 0;
      }
      return num;
    }
    function drawChart2(daily) {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Day');
      data.addColumn('number', 'Life');
      data.addColumn('number', 'Entertainment');
      data.addColumn('number', 'MED');
      data.addColumn('number', 'Course Work');
      data.addColumn('number', 'Language');
      data.addColumn('number', 'unrecorded')

      let day28 = dayAdjuster('day28');
      let day27 = dayAdjuster('day27');
      let day26 = dayAdjuster('day26');
      let day25 = dayAdjuster('day25');
      let day24 = dayAdjuster('day24');
      let day23 = dayAdjuster('day23');
      let day22 = dayAdjuster('day22');
      let day21 = dayAdjuster('day21');
      let day20 = dayAdjuster('day20');
      let day19 = dayAdjuster('day19');
      let day18 = dayAdjuster('day18');
      let day17 = dayAdjuster('day17');
      let day16 = dayAdjuster('day16');
      let day15 = dayAdjuster('day15');
      let day14 = dayAdjuster('day14');
      let day13 = dayAdjuster('day13');
      let day12 = dayAdjuster('day12');
      let day11 = dayAdjuster('day11');
      let day10 = dayAdjuster('day10');
      let day9 = dayAdjuster('day9');
      let day8 = dayAdjuster('day8');
      let day7 = dayAdjuster('day7');
      let day6 = dayAdjuster('day6');
      let day5 = dayAdjuster('day5');
      let day4 = dayAdjuster('day4');
      let day3 = dayAdjuster('day3');
      let day2 = dayAdjuster('day2');
      let day1 = dayAdjuster('day1');
      
      data.addRows([
        [day28.toDateString().substring(0,11), daily.day28.Life, daily.day28.Entertainment, daily.day28.MED,daily.day28['Course Work'], daily.day28.Language, unplanned(daily.day28)],
        [day27.toDateString().substring(0,11), daily.day27.Life, daily.day27.Entertainment, daily.day27.MED,daily.day27['Course Work'], daily.day27.Language, unplanned(daily.day27)],
        [day26.toDateString().substring(0,11), daily.day26.Life, daily.day26.Entertainment, daily.day26.MED,daily.day26['Course Work'], daily.day26.Language, unplanned(daily.day26)],
        [day25.toDateString().substring(0,11), daily.day25.Life, daily.day25.Entertainment, daily.day25.MED,daily.day25['Course Work'], daily.day25.Language, unplanned(daily.day25)],
        [day24.toDateString().substring(0,11), daily.day24.Life, daily.day24.Entertainment, daily.day24.MED,daily.day24['Course Work'], daily.day24.Language, unplanned(daily.day24)],
        [day23.toDateString().substring(0,11), daily.day23.Life, daily.day23.Entertainment, daily.day23.MED,daily.day23['Course Work'], daily.day23.Language, unplanned(daily.day23)],
        [day22.toDateString().substring(0,11), daily.day22.Life, daily.day22.Entertainment, daily.day22.MED,daily.day22['Course Work'], daily.day22.Language, unplanned(daily.day22)],
        [day21.toDateString().substring(0,11), daily.day21.Life, daily.day21.Entertainment, daily.day21.MED,daily.day21['Course Work'], daily.day21.Language, unplanned(daily.day21)],
        [day20.toDateString().substring(0,11), daily.day20.Life, daily.day20.Entertainment, daily.day20.MED,daily.day20['Course Work'], daily.day20.Language, unplanned(daily.day20)],
        [day19.toDateString().substring(0,11), daily.day19.Life, daily.day19.Entertainment, daily.day19.MED,daily.day19['Course Work'], daily.day19.Language, unplanned(daily.day19)],
        [day18.toDateString().substring(0,11), daily.day18.Life, daily.day18.Entertainment, daily.day18.MED,daily.day18['Course Work'], daily.day18.Language, unplanned(daily.day18)],
        [day17.toDateString().substring(0,11), daily.day17.Life, daily.day17.Entertainment, daily.day17.MED,daily.day17['Course Work'], daily.day17.Language, unplanned(daily.day17)],
        [day16.toDateString().substring(0,11), daily.day16.Life, daily.day16.Entertainment, daily.day16.MED,daily.day16['Course Work'], daily.day16.Language, unplanned(daily.day16)],
        [day15.toDateString().substring(0,11), daily.day15.Life, daily.day15.Entertainment, daily.day15.MED,daily.day15['Course Work'], daily.day15.Language, unplanned(daily.day15)],
        [day14.toDateString().substring(0,11), daily.day14.Life, daily.day14.Entertainment, daily.day14.MED,daily.day14['Course Work'], daily.day14.Language, unplanned(daily.day14)],
        [day13.toDateString().substring(0,11), daily.day13.Life, daily.day13.Entertainment, daily.day13.MED,daily.day13['Course Work'], daily.day13.Language, unplanned(daily.day13)],
        [day12.toDateString().substring(0,11), daily.day12.Life, daily.day12.Entertainment, daily.day12.MED,daily.day12['Course Work'], daily.day12.Language, unplanned(daily.day12)],
        [day11.toDateString().substring(0,11), daily.day11.Life, daily.day11.Entertainment, daily.day11.MED,daily.day11['Course Work'], daily.day11.Language, unplanned(daily.day11)],
        [day10.toDateString().substring(0,11), daily.day10.Life, daily.day10.Entertainment, daily.day10.MED,daily.day10['Course Work'], daily.day10.Language, unplanned(daily.day10)],
        [day9.toDateString().substring(0,11), daily.day9.Life, daily.day9.Entertainment, daily.day9.MED,daily.day9['Course Work'], daily.day9.Language, unplanned(daily.day9)],
        [day8.toDateString().substring(0,11), daily.day8.Life, daily.day8.Entertainment, daily.day8.MED,daily.day8['Course Work'], daily.day8.Language, unplanned(daily.day8)], 
        [day7.toDateString().substring(0,11), daily.day7.Life, daily.day7.Entertainment, daily.day7.MED,daily.day7['Course Work'], daily.day7.Language, unplanned(daily.day7)], 
        [day6.toDateString().substring(0,11), daily.day6.Life, daily.day6.Entertainment, daily.day6.MED,daily.day6['Course Work'], daily.day6.Language, unplanned(daily.day6)], 
        [day5.toDateString().substring(0,11), daily.day5.Life, daily.day5.Entertainment, daily.day5.MED,daily.day5['Course Work'], daily.day5.Language, unplanned(daily.day5)], 
        [day4.toDateString().substring(0,11), daily.day4.Life, daily.day4.Entertainment, daily.day4.MED,daily.day4['Course Work'], daily.day4.Language, unplanned(daily.day4)], 
        [day3.toDateString().substring(0,11), daily.day3.Life, daily.day3.Entertainment, daily.day3.MED,daily.day3['Course Work'], daily.day3.Language, unplanned(daily.day3)], 
        [day2.toDateString().substring(0,11), daily.day2.Life, daily.day2.Entertainment, daily.day2.MED,daily.day2['Course Work'], daily.day2.Language, unplanned(daily.day2)], 
        [day1.toDateString().substring(0,11), daily.day1.Life, daily.day1.Entertainment, daily.day1.MED,daily.day1['Course Work'], daily.day1.Language, unplanned(daily.day1)]
      ]);

      var options = {
        chart: {
          title: 'How you spent your day',
          subtitle: 'in hours and percentage'
        },
        chartArea: {
          left: '2%'
        },
        legend: {position: 'top', maxLines: 2},
        width: 1250,
        height: 500,
        colors: ['lightblue', 'brown', 'darkblue', 'green', 'orange', 'lightgray'],
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, google.charts.Line.convertOptions(options));

      //bar googleCharts
      drawChart3(data)
      // var view = new google.visualization.DataView(data);
      

      // var barchart_options = {
      //   width: 900,
      //   height: 2000,
      //   legend: { position: 'top', maxLines: 3 },
      //   bar: { groupWidth: '95%' },
      //   isStacked: true
      // };
        
      // var options_fullStacked = {
      //   chart: {
      //     title: 'Each day stack chart',
      //     subtitle: 'in hours and percentage'
      //   },
      //   reverseCategories: true, //goes from bottom up (sooner day 1st!)
      //   colors: ['lightblue', 'brown', 'darkblue', 'green', 'orange', 'lightgray'],
      //   isStacked: 'percent',
      //   height: 2500,
      //   legend: {position: 'top', maxLines: 2},
      //   bar: { groupWidth: '75%' },
      //   chartArea: {
      //     top: '10%',
      //     bottom: '10%'
      //   },
      //   hAxis: {
      //     minValue: 0,
      //     ticks: [0, .3, .6, .9, 1]
      //   }
      // };
      
      //   var barchart = new google.visualization.BarChart(document.getElementById('barchart_material'));
      //   barchart.draw(view, options_fullStacked);

    }

    function drawChart3(data) {
      var view = new google.visualization.DataView(data);

      // var options = {
      //   width: 1200,
      //   height: 500,
      //   legend: { position: 'top', maxLines: 3 },
      //   bar: { groupWidth: '95%' },
      //   isStacked: true,
      // };

      var options_fullStacked = {
        reverseCategories: true, //goes from bottom up (sooner day 1st!)?
        chart: {
          title: 'Each day stack chart',
          subtitle: 'in hours and percentage'
        },
        // reverseCategories: true, //goes from bottom up (sooner day 1st!)
        colors: ['lightblue', 'brown', 'darkblue', 'green', 'orange', 'lightgray'],
        isStacked: 'percent',
        width: 2500,
        height: 500,
        legend: {position: 'top', maxLines: 2},
        bar: { groupWidth: '75%' },
        chartArea: {
          top: '20%',
          bottom: '20%',
          left: '3%'
        },
        vAxis: {
          minValue: 0,
          ticks: [0, 0.25, 0.5, 0.75, 1]
        }
      };
    

      var chart = new google.visualization.ColumnChart(document.getElementById('barchart_material'));
      chart.draw(view, options_fullStacked);
  }

  