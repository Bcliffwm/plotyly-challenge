// Copying boilerplate from week 15 act 4 solved
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  
  // Submit Button handler
  function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input value from the form
    var bellyData = d3.select("#selDataset").node().value;
    console.log(bellyData);
  
    // clear the input value
    d3.select("#selDataset").node().value = "";
  
    // Build the plot with the new stock
    buildPlot(bellyData);
}

function buildPlot(bellyData) {
    d3.json('samples.json').then( function(data) {
        // var names = unpack(bellyData.dataset,0);
        // var metadata = unpack(bellyData.dataset,1);
        // var samples = unpack(bellyData.dataset,2);
        console.log(data)
    });

}


// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
// Use sample_values as the values for the bar chart. ****

// Use otu_ids as the labels for the bar chart. ****

// Use otu_labels as the hovertext for the chart. ****

