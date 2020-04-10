import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';

import React from 'react'
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

class MyFirstGrid extends React.Component {
    render() {
        const currentWidth = (window.innerWidth - 50) / 3;

        // {lg: layout1, md: layout2, ...}
        const layouts = {
            lg: [
                { i: '1', x: 0, y: 0, w: 4, h: 1 },
                { i: '2', x: 4, y: 0, w: 4, h: 1 },
                { i: '3', x: 8, y: 0, w: 4, h: 1 },
                { i: '4', x: 8, y: 0, w: 4, h: 1 },
            ]
        };
        return (
            <div>

                <ResponsiveGridLayout
                    measureBeforeMount={true}
                    isResizable={false}
                    verticalCompact={true}
                    compactType='vertical'
                    style={{ backgroundColor: 'gray', maxHeight: currentWidth + 10 }}
                    className="layout" layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                    rowHeight={currentWidth}
                >
                    <img src="https://static.arasaac.org/pictograms/2340/2340_2500.png" key="4" />
                    <div style={{ backgroundColor: 'red' }} key="1">1</div>
                    <div style={{ backgroundColor: 'blue' }} key="2">2</div>
                    <div style={{ backgroundColor: 'green' }} key="3">3</div>
                </ResponsiveGridLayout>
            </div>

        )
    }
}

// class MyFirstGrid extends React.Component {
//     render() {
//         // layout is an array of objects, see the demo for more complete usage
//         const layout = [
//             { i: 'a', x: 1, y: 0, w: 3, h: 3},
//             { i: 'b', x: 1, y: 0, w: 3, h: 3},
//             { i: 'c', x: 1, y: 0, w: 3, h: 3 }
//         ];
//         return (
//             <GridLayout
//             style={{backgroundColor: 'gray'}}
//                 className="layout"
//                 layout={layout}
//                 cols={9}
//                 rowHeight={50}
//                 width={500}
//                 isResizable={false}
//             >
//                 <div style={{ color: 'white', backgroundColor: 'red' }} key="a">a</div>
//                 <div style={{ color: 'white', backgroundColor: 'blue' }} key="b">b</div>
//                 <div style={{ color: 'white', backgroundColor: 'green' }} key="c">c</div>
//             </GridLayout>
//         )
//     }
// }

export default MyFirstGrid;