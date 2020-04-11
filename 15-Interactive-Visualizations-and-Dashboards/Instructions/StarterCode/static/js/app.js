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

function buildMetadata(bellyData) {
  d3.json('samples.json').then((data)=>{
    var metadata = data.metadata;
    var results = metadata.filter(sampleObj => sampleObj.id == bellyData);
    var result = results[0];
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value])=>{
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
};

function buildPlot(bellyData) {
    d3.json('samples.json').then((data)=> {
        var samples = data.samples;
        var results = samples.filter(sampleObj => sampleObj.id == bellyData);
        var result = results[0];
        
        var labels = result.otu_labels;
        var ids = result.otu_ids;
        
        var values = result.sample_values;
        var sortedValues = values.reverse();
        var splicedValues = sortedValues.splice(0,10);

        var bubbleLayout = {
          title: "Cultures per Sample",
          margin: { t: 0 },
          hovermode: "closest",
          xaxis: { title: "OTU ID" },
          // margin: { t: 30}
        };
        var bubbleData = [{
          x: values,
          y: ids,
          text: labels,
          mode: "markers",
          marker: {
            size: values,
            color: ids,
            colorscale: "Earth", 
          }
        }];

        var barLayout = {
          title: "Top 10 OTUs per Sample",
          margin: {t:0},
          xaxis: {title: "Values"},     
        };
        var barData = [{
          x: splicedValues,
          y: ids,
          text: labels,
          type: "bar", 
          orientation: 'h'
        }];
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        Plotly.newPlot("bar", barData, barLayout);
        console.log(data)
    });

}

function init() {
  var selector = d3.select("#selDataset");
  d3.json('samples.json').then((data)=>{
    var names = data.names;
    names.forEach(element => {
      selector
        .append("option")
        .text(element)
        .property("value", element);
    });
    var firstElement = names[0];
    buildPlot(firstElement);
    buildMetadata(firstElement);
  });
}

function optionChanged(newSample) {
  buildPlot(newSample);
  buildMetadata(newSample);
}

init();
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
// Use sample_values as the values for the bar chart. ****

// Use otu_ids as the labels for the bar chart. ****

// Use otu_labels as the hovertext for the chart. ****

