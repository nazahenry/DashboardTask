import React from "react";
import MaterialTable from "material-table";

export default function Dashboard() {


    // React.useEffect(() => {

      // const values = fetch('http://localhost:1111/select', {
      //   method: 'GET',
      //   headers: {'Content-Type': 'application/json'}
      // })
      // .then(res => res.json())
      // .then(msg => msg )
      // .catch(err => console.error('Something is wrong!', err))
    // },[])

    // const values = fetch('http://localhost:1111/select', {
    //     method: 'GET',
    //     headers: {'Content-Type': 'application/json'}
    //   })
    //   .then(res => res.json())
    //   .then(msg => { return msg })
    //   .catch(err => console.error('Something is wrong!', err))

    // console.log(values)  

    const [state, setState] = React.useState({

      columns: [
        { title: "Faculty ID", field: "faculty_id" },
        { title: "Faculty", field: "faculty" },
        { title: "Description", field: "description" },
        { title: "Entry Date", field: "entry_date"}
        // { title: "Entry date", field: 'mobile_no', type: "number"},
        // {
        //   title: "Birth Place",
        //   field: "birthCity",
        //   lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
        // }
      ],

      data: () =>
        new Promise((resolve, reject) => {
          let url = 'http://localhost:1111/select'
          fetch(url)
            .then(response => response.json())
            .then(result => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.total,
              })
            })
        })
      

    });
  
    const tableRef = React.createRef();

  return (
    <div style={{ padding: 25 }}>

      <MaterialTable
        title="Dashboard"
        tableRef={tableRef}
        columns={state.columns}
        data={state.data}
        options={{
          exportButton: true,
          filtering: false,
          loadingType: "overlay",
          actionsColumnIndex: -1,
          selection: false,          
        }}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.push(newData);
                setState({ ...state, data });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });
              }, 600);
            })
        }}

        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          }
        ]}
      />
    </div>

  );
}
