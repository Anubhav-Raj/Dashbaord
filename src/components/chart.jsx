import CanvasJSReact from "@canvasjs/react-charts";
import React, { useRef, useState, useEffect } from "react";

const { CanvasJSChart } = CanvasJSReact;
function chart() {
  const chartRefIntensity = useRef(null);
  const chartRefLikelihood = useRef(null);
  const chartRefRelevance = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/fetchData");
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
        // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      const intensityOptions = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Intensity Chart",
        },
        axisY: {
          title: "Intensity",
        },
        legend: {
          verticalAlign: "top",
          horizontalAlign: "center",
          fontSize: 16,
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            type: "area",
            name: "Intensity",
            showInLegend: true,
            legendMarkerType: "square",
            legendMarkerColor: "green",
            legendText: "Intensity",
            dataPoints: data.map((item, index) => ({
              x: index + 1,
              y: item.intensity,
              label: item.intensity,
            })),
          },
        ],
      };

      const likelihoodOptions = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Likelihood Chart",
        },
        axisY: {
          title: "Likelihood",
        },
        legend: {
          verticalAlign: "top",
          horizontalAlign: "center",
          fontSize: 16,
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            type: "area",
            name: "Likelihood",
            showInLegend: true,
            legendMarkerType: "square",
            legendMarkerColor: "blue",
            legendText: "Likelihood",
            dataPoints: data.map((item, index) => ({
              x: index + 1,
              y: item.likelihood,
              label: item.likelihood,
            })),
          },
        ],
      };

      const relevanceOptions = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Relevance Chart",
        },
        axisY: {
          title: "Relevance",
        },
        legend: {
          verticalAlign: "top",
          horizontalAlign: "center",
          fontSize: 16,
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            type: "area",
            name: "Relevance",
            showInLegend: true,
            legendMarkerType: "square",
            legendMarkerColor: "orange",
            legendText: "Relevance",
            dataPoints: data.map((item, index) => ({
              x: index + 1,
              y: item.relevance,
            })),
          },
        ],
      };

      if (chartRefIntensity.current) {
        chartRefIntensity.current.render(intensityOptions);
      }

      if (chartRefLikelihood.current) {
        chartRefLikelihood.current.render(likelihoodOptions);
      }

      if (chartRefRelevance.current) {
        chartRefRelevance.current.render(relevanceOptions);
      }
    }
  }, [data, loading, error]);

  if (loading) {
    return <div>Loading...</div>; // or show a loading spinner
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" flex-1 p-7">
      <h1 className="text-2xl font-semibold  text-center ">Graph Page</h1>
      <CanvasJSChart
        options={{}} // Empty options, as they are set in the useEffect
        // eslint-disable-next-line no-return-assign
        onRef={(ref) => (chartRefIntensity.current = ref)}
      />
      <CanvasJSChart
        options={{}} // Empty options, as they are set in the useEffect
        // eslint-disable-next-line no-return-assign
        onRef={(ref) => (chartRefLikelihood.current = ref)}
      />
      <CanvasJSChart
        options={{}} // Empty options, as they are set in the useEffect
        // eslint-disable-next-line no-return-assign
        onRef={(ref) => (chartRefRelevance.current = ref)}
      />
    </div>
  );
}

export default chart;
