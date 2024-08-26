import React, { useState, useEffect } from "react"
import DataTable from 'datatables.net-dt';
import 'datatables.net-responsive-dt';

import "../src/App.css"

export default function Practice() {

    const [api, setAPI] = useState([])

    console.log("api", api);

    function API() {
        fetch("https://dummyjson.com/users").then((data) => {
            return data.json()
        }).then((data) => {
            console.log(data.users);
            setAPI(data.users)
        })


        console.log();
        // setAPI(data.users)
    }

    useEffect(() => {
        API()
    }, [])

    new DataTable('#example', {
        "data" : api,
        "columns" : [
            {"data" : "id"},
            {"data" : "username"},
            {"data" : "email"},
            {"data" : "password"},
            {"data" : "bloodGroup"}
        ],

        destroy: true
    });

  

    return (
        <div className="container">

            <table id="example" className="table table-striped text-center" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>username</th>
                        <th>email</th>
                        <th>password</th>
                        <th>bloodGroup</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>

            {/* <input type="text" />
            <DataTable
            
            columns={column}
            data={data}
            fixedHeader
            pagination
            ></DataTable> */}

        </div>
    )
}