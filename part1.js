const neatCsv = require('neat-csv');
const fs = require('fs')

fs.readFile('./matches.csv', async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  /* Getting csv data */
  let csv_data = await neatCsv(data);
  //console.log(csv_data);

  let year = csv_data.map(({id, season}) => ({id, season}));
  //1. Number of matches played per year of all the years in IPL
  console.log('\r\n',"1. Number of matches played per year of all the years in IPL",'\r\n');
  let lookup = {};
  let items = csv_data;
  let result = [];
  let played_matches_per_year = 0;
  let remaining_year = '';
  for (let item, i = 0; item = items[i++];) {
    let season = item.season;
    if(i == 1){
      remaining_year = season;
    }
    if (!(season in lookup)) {
      if(played_matches_per_year != 0){
        console.log("No. of Matches Played in ",season," are ",played_matches_per_year);
        played_matches_per_year = 0;
      }
      lookup[season] = 1;
      result.push(season);
    } else {
      played_matches_per_year++;
    }
  }
  console.log("No. of Matches Played in ",remaining_year," are ",played_matches_per_year,'\r\n');

   console.log("2. Number of matches won of all teams over all the years of IPL.",'\r\n');
   let lookup_winner = {};
   let items_winner = csv_data;
   let result_winner = [];
   let won_matches_by_team = 0;
   for (let item_winner, i = 0; item_winner = items_winner[i++];) {
    let winner = item_winner.winner;
  
    if (!(winner in lookup_winner)) {
      console.log("No. of won by ",winner," - ",winner.length);
      lookup_winner[winner] = 1;
      result.push(winner);
    } else {
      won_matches_by_team++;
    }

  }

console.log('\r\n',"3. For the year 2016 get the extra runs conceded per team.",'\r\n');
  let lookup_runs = {};
  let items_runs = csv_data;
  let total_run = 0;
  for (let item_runs, i = 0; item_runs = items_runs[i++];) {

    let season_winner = item_runs.season;
    let season_winner_runs = item_runs.win_by_runs;
    let extra_run_winner = item_runs.winner;
    if(season_winner == 2016){
      if (!(extra_run_winner in lookup_runs)) {
        //console.log("No. of won by ",season_winner_runs,extra_run_winner);
        lookup_runs[extra_run_winner] = season_winner_runs;
        result.push(extra_run_winner);
      } else{
        lookup_runs[extra_run_winner] = Number(lookup_runs[extra_run_winner]) + Number(season_winner_runs);
      }
      //console.log(Object.values(items_runs));
    }

  }
  console.log(lookup_runs);
   //console.log("No. of Matches Played in ",winner," are ",played_matches_per_year,'\r\n');

});
