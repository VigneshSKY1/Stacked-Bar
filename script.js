// Data
const data = [
    { team: 'CLOUDA', kills: 57, damage: 34 },
    { team: 'CYCLONEF', kills: 38, damage: 29 },
    { team: 'EMBER', kills: 42, damage: 29 },
    { team: 'RIDERRRR', kills: 55, damage: 28 },
    { team: 'SPAWN', kills: 45, damage: 30 },
    { team: 'GH0STTTT', kills: 52, damage: 27 },
    { team: 'KARMAN', kills: 42, damage: 23 },
    { team: 'L0NGBARREL', kills: 28, damage: 19 },
    { team: 'N1', kills: 29, damage: 14 },
    { team: 'RESOLUXE', kills: 53, damage: 24 },
];

const margin = { top: 100, right: 20, bottom: 100, left: 80 };
const width = 1500 //- margin.left - margin.right;
const height = 700 //- margin.top - margin.bottom;

// Append SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Define scales
const x = d3.scaleBand()
    .domain(data.map(d => d.team))
    .range([0, width])
    .padding(0.2);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.kills + d.damage)])
    .nice()
    .range([height, 0]);

// Add gradients
const defs = svg.append("defs");

// Gradient for X axis text
const gradient = defs.append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "0%");
gradient.append("stop")
    .attr("offset", "0%")
    .style("stop-color", "#FFFFFF")
    .style("stop-opacity", 1);
gradient.append("stop")
    .attr("offset", "100%")
    .style("stop-color", "#D1BECC")
    .style("stop-opacity", 1);

// Gradient for kills bar
const killsGradient = defs.append("linearGradient")
    .attr("id", "kills-gradient")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");
killsGradient.append("stop")
    .attr("offset", "0%")
    .style("stop-color", "#5c043f")
    .style("stop-opacity", 1);
killsGradient.append("stop")
    .attr("offset", "100%")
    .style("stop-color", "#a90572")
    .style("stop-opacity", 1);

// Gradient for damage bar
const damageGradient = defs.append("linearGradient")
    .attr("id", "damage-gradient")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");
damageGradient.append("stop")
    .attr("offset", "0%")
    .style("stop-color", "#003d50")
    .style("stop-opacity", 1);
damageGradient.append("stop")
    .attr("offset", "100%")
    .style("stop-color", "#227b8e")
    .style("stop-opacity", 1);

// Append axes
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

// Append bar groups
const barGroups = svg.selectAll(".bar-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "bar-group")
    .attr("transform", d => `translate(${x(d.team)},0)`);

// Append team logos
barGroups.append("image")
    .attr("xlink:href", d => `logos/${d.team}.png`)
    .attr("class", "team-logo image-fly-in")
    .attr("x", 10)
    .attr("y", height + 100)
    .attr("width", 50)
    .attr("height", 50)
    .attr("opacity", 0)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 200 + 1000)
    .attr("y", d => y(d.kills + d.damage) + 10)
    .attr("opacity", 1);

// Append kills bar
barGroups.append("rect")
    .attr("class", "bar kills")
    .attr("x", 0)
    .attr("y", height)
    .attr("width", x.bandwidth())
    .attr("height", 0)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 200)
    .attr("y", d => y(d.kills))
    .attr("height", d => height - y(d.kills));

// Append text inside kills bar
barGroups.append("text")
    .attr("class", "text-inside-bar")
    .attr("x", x.bandwidth() / 2)
    .attr("y", d => y(d.kills / 2))
    .text(d => d.kills)
    .attr("opacity", 0)
    .transition()
    .duration(6000)
    .delay((d, i) => i * 100)
    .attr("opacity", 1);

// Append damage bar
barGroups.append("rect")
    .attr("class", "bar damage")
    .attr("x", 0)
    .attr("y", height)
    .attr("width", x.bandwidth())
    .attr("height", 0)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 200 + 500)
    .attr("y", d => y(d.kills + d.damage))
    .attr("height", d => height - y(d.damage));

// Append text inside damage bar
barGroups.append("text")
    .attr("class", "text-inside-bar")
    .attr("x", x.bandwidth() / 2)
    .attr("y", d => y(d.kills + d.damage - d.damage / 2))
    .text(d => d.damage)
    .attr("opacity", 0)
    .transition()
    .duration(6000)
    .delay((d, i) => i * 200 + 200)
    .attr("opacity", 1);



// Append chart title
svg.append("text")
    .attr("class", "bar-title")
    .attr("x", width / 2)
    .attr("y", 800)
    .text("PLAYER COMPARISON");

//white Background
const legendBackground = svg.append("rect")
    .attr("x", width - 1515)
    .attr("y", -100)
    .attr("width", 270)
    .attr("height", 35)
    .style("fill", "#ffffff")
    .style("opacity", 0.8);

// Append legend for kills
const legendKills = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 1500}, -95)`);

legendKills.append("rect")
    .attr("width", 110)
    .attr("height", 25)
    .style("fill", "url(#kills-gradient)");

legendKills.append("text")
    .attr("x", 35)
    .attr("y", 18)
    .text("Kills")
    .style("fill", "#ffffff");

// Append legend for damage
const legendDamage = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 1370}, -95)`);

legendDamage.append("rect")
    .attr("width", 110)
    .attr("height", 25)
    .style("fill", "url(#damage-gradient)");

legendDamage.append("text")
    .attr("x", 22)
    .attr("y", 18)
    .text("Death")
    .style("fill", "#ffffff");
