import React from 'react';
import Table from "./Table"
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const fetch = require('node-fetch');
let houseData=[], foodData=[], clothingData=[]

const houseColumns=[{
        Header: 'Housing',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "housing"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "Other Contact",
            accessor: "contact"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Notes",
            accessor: "notes"
        },{
            Header: "Distance",
            accessor: "distance"
        }]
}]

const foodColumns=[{
        Header: 'Food',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "type"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Notes",
            accessor: "notes",
            width: 2000
        },{
            Header: "Site",
            accessor: "site",
            Cell: ({ row }) => {
                if(row.original.site!=='N/A')
                    return <a href={row.original.site}>Site</a>
                return <p>N/A</p>
            }
        },{
            Header: "Timing",
            accessor: "timing"
        },{
            Header: "Distance",
            accessor: "distance"
        }]
}]

const clothingColumns=[{
        Header: 'Clothing',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "type"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Site",
            accessor: "site",
            Cell: ({ row }) => {
                if(row.original.site!=='N/A')
                    return <a href={row.original.site}>Site</a>
                return <p>N/A</p>
            }
        },{
            Header: "Timing",
            accessor: "timing"
        },{
            Header: "Notes",
            accessor: "other"
        },{
            Header: "Distance",
            accessor: "distance"
        }]
}]
let findByLoc=({setData}, {setHouse}, {setFood}, {setCloth}, {setOpen}, {setTableCols}, {setHouseStyle}, {setFoodStyle}, {setClothingStyle})=>{
    setHouse(true)
    setFood(true)
    setCloth(true)
    setTableCols(houseColumns)
    setHouseStyle("primary")
    setFoodStyle("default")
    setClothingStyle("default")
    if(localStorage.getItem("houseData")==null){
        console.log("Housing was null")
        fetch('https://sortbydistance.herokuapp.com/dist/housing')
        .then(res => res.json())
        .then(json => {
            setData(json)
            localStorage.setItem("houseData",JSON.stringify(json))
            houseData=json
            setHouse(false)
            console.log("had to scrape", JSON.parse(localStorage.getItem("houseData")))
        });
    } else{
        setData(JSON.parse(localStorage.getItem("houseData")))
        houseData=JSON.parse(localStorage.getItem("houseData"))
        console.log("saw it locally", houseData)
        setHouse(false)
    }
    if(localStorage.getItem("clothingData")==null){
        fetch('https://sortbydistance.herokuapp.com/dist/clothing')
        .then(res => res.json())
        .then(json => {
            localStorage.setItem("clothingData",JSON.stringify(json))
            clothingData=json
            setCloth(false)
        });
    } else{
        console.log("found cloth")
        clothingData=JSON.parse(localStorage.getItem("clothingData"))
        setCloth(false)
    }
    if(localStorage.getItem("foodData")==null){
        fetch('https://sortbydistance.herokuapp.com/dist/food')
        .then(res => res.json())
        .then(json => {
            localStorage.setItem("foodData",JSON.stringify(json))
            foodData=json
            setFood(false)
        });
    }
    else{
        console.log("found food")
        foodData=JSON.parse(localStorage.getItem("foodData"))
        setFood(false)
    }
    setOpen(false)
}

let defaultSort=({setData}, {setOpen}, {setHouse}, {setFood}, {setCloth}, {setTableCols}, {setHouseStyle}, {setFoodStyle}, {setClothingStyle})=>{
    setHouse(true)
    setFood(true)
    setCloth(true)
    setHouseStyle("primary")
    setFoodStyle("default")
    setClothingStyle("default")
    setTableCols(houseColumns)
    fetch('https://sortbydistance.herokuapp.com/housing')
    .then(res => res.json())
    .then(json => {
        setData(json)
        setHouse(false)
        houseData=json
    });
    fetch('https://sortbydistance.herokuapp.com/food')
    .then(res => res.json())
    .then(json => {
        foodData=json
        setFood(false)
    });
    fetch('https://sortbydistance.herokuapp.com/clothing')
    .then(res => res.json())
    .then(json => {
       clothingData=json
       setCloth(false)
     });
     setOpen(false)
}
export default function Resources(props) {
    console.log(props.logged)
    //localStorage.clear()
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [houseStyle, setHouseStyle] = React.useState("primary")
    const [clothingStyle, setClothingStyle] = React.useState("default")
    const [foodStyle, setFoodStyle] = React.useState("default")
    const [houseLoading, setHouse] = React.useState(true)
    const [clothLoading, setCloth] = React.useState(true)
    const [foodLoading, setFood] = React.useState(true)
    const [tableCols, setTableCols] = React.useState(houseColumns)
    React.useEffect(() => {
            fetch('https://sortbydistance.herokuapp.com/housing')
            .then(res => res.json())
            .then(json => {
                setData(json)
                houseData=json
                setHouse(false)
            });
            fetch('https://sortbydistance.herokuapp.com/food')
            .then(res => res.json())
            .then(json => {
                setFood(false)
                foodData=json
            });
            fetch('https://sortbydistance.herokuapp.com/clothing')
            .then(res => res.json())
            .then(json => {
                setCloth(false)
                clothingData=json
            });
        return () => console.log('unmounting...');
      }, [])
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return (
        <Container>
            <div style={{ display: "flex" }}>
        <Button onClick={() => { setTableCols(houseColumns); setData(houseData); setHouseStyle("primary"); setFoodStyle("default"); setClothingStyle("default");}} variant="contained" color={houseStyle}>
          Housing
        </Button>
        <Button onClick={() => { setTableCols(foodColumns); setData(foodData); setFoodStyle("primary"); setClothingStyle("default"); setHouseStyle("default");}} variant="contained" color={foodStyle}>
          Food
        </Button>
        <Button onClick={() => { setTableCols(clothingColumns); setData(clothingData); setClothingStyle("primary"); setFoodStyle("default"); setHouseStyle("default");}} variant="contained" color={clothingStyle}>
          Clothing
        </Button>
        <Button style={{ marginLeft: "auto" }} variant="contained" color="secondary" onClick={handleClickOpen}>
            Sort By Location
        </Button>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Sort all resources by location?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This option will sort all resources in this table by increasing distance from you, and display how far you are from each resource as well. It will use your IP 
                address to approximate your location. Using mobile data or a VPN may not produce intended results. Please click
                one of the sorting options below to continue.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{defaultSort({setData}, {setOpen}, {setHouse}, {setFood}, {setCloth}, {setTableCols}, {setHouseStyle}, {setFoodStyle}, {setClothingStyle})}} color="primary">
                Display in default order
            </Button>
            <Button onClick={()=>{findByLoc({setData}, {setHouse}, {setFood}, {setCloth}, {setOpen}, {setTableCols}, {setHouseStyle}, {setFoodStyle}, {setClothingStyle})}} color="primary" autoFocus>
                Sort by distance
            </Button>
            </DialogActions>
        </Dialog>
        <br/><br/>
           {
                (houseLoading&&clothLoading&&foodLoading)?"Loading data...":<Table columns={tableCols} data={data} />
            }
        </Container>
    )
}