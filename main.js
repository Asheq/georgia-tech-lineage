google.charts.load('current', {
    packages: ["orgchart"]
});
google.charts.setOnLoadCallback(main);

function drawVisualization(list) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Big');
    data.addColumn('string', 'Class');

    for (var i = 0; i < list.length; i++) {
        var name = list[i][0];
        var parent = list[i][1];
        var secondary = list[i][2];

        if (parent === 'null') {
            parent = ''
        }

        if (secondary === undefined) {
            secondary = ''
        }
        data.addRows([
            [{
                    v: name,
                    f: name + '<div style="color:grey; font-style:italic">' + secondary + '</div>'
                },
                parent, name
            ]
        ]);
    };

    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, {
        allowHtml: true
    });
}

function main() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            var list = CSVToArray(xmlhttp.responseText);
            drawVisualization(list);
        }
    }
    xmlhttp.open("GET", "list.csv", true);
    xmlhttp.send();
}
