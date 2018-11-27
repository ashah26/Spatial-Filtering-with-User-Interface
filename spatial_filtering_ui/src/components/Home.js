import React,{Component} from 'react';
import {fetchFilterData, performFilter} from "./../api/API";
import SelectFilter from "./SelectFilter";
import notavailable from './../assets/images/not_available.jpg';


class Home extends Component{
    constructor(){
        super();
        this.state = {
            name: "ashna",
            selected_filter_type: "",
            selected_filter: "",
            open_modal: false,
            mask_list: [],
            selected_mask_dict: [],
            original_image:"",
            file_path: "",
            filtered_image:"",
            filter_dict: {}
        }
    }

    componentDidMount() {
        fetchFilterData().then((res)=>{
            console.log(res.status);

            if(res.status === 200){
                res.json().then((data)=>{
                    console.log("fetch filter data: ",data);
                    this.setState({
                        ...this.state,
                        filter_dict: data
                    })
                });
            }else{
               console.log("DID MOUNT ERROR");
               alert("Error with Fetching Filter Options. Please try later");
            }

        })
    }

    showFilters = (()=>{
        if(this.state.selected_filter_type){
            return Object.keys(this.state.filter_dict[this.state.selected_filter_type]).map((filter, index)=>{
                return(
                    <div className="custom-control custom-radio">
                        <input className="custom-control-input" type="radio" id={filter} name="filterName"
                               checked={this.state.selected_filter === filter}
                               onClick={(()=>{
                                   this.setState({
                                       ...this.state,
                                       selected_filter: filter,
                                       mask_list: this.state.filter_dict[this.state.selected_filter_type][filter]
                                   })
                               })}
                        />
                        <label className="custom-control-label" for={filter}>{filter}</label>
                    </div>
                )
            })
        }
    });


    showFilterTypes = (()=>{
        console.log("In SHow Filter", this.state.filter_dict, Object.keys(this.state.filter_dict));
        return Object.keys(this.state.filter_dict).map((filter_type, index)=>{
            return (
                <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id={filter_type} name="filter_type"
                           onClick={(()=>{
                               this.setState({
                                   ...this.state,
                                   selected_filter_type: filter_type,
                                   selected_filter: "",
                                   mask_list: []
                               })
                           })}
                    />

                    <label className="custom-control-label" for={filter_type}>{filter_type}</label>
                </div>
            )
        })
    });

    toggle = (()=>{
        this.setState({
            ...this.state,
            open_modal: !this.state.open_modal
        })
    });

    handleSelectFilter = (()=>{
        this.toggle();

    });

    showFilterMask = (()=>{
        // if(this.state.open_modal){
        //     if(this.state.selected_filter && this.state.selected_filter_type){
        if(this.state.mask_list.length > 0){
            return this.state.mask_list.map((mask, index)=>{
                return (
                    <div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                            {((mask.length > 0 && mask[0] !== 0)? mask[0] : "")}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            {
                                (
                                    mask.length > 1 ?
                                        mask[1].map((row, index)=>{
                                            return (
                                                <span className="row">
                                                        {
                                                            row.map((column,index)=>{
                                                                return(
                                                                    <span className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                                        {column}
                                                                    </span>
                                                                )
                                                            })
                                                        }
                                                    <br/>
                                                     </span>
                                            )
                                        })
                                        : "")
                            }
                        </div>
                    </div>
                )
            })
        }

        // }
        // }
        // return (
        // )
    });

    uploadImage = ((event)=> {
        let file = event.target.files[0];
        let fileReader;
        console.log("handleFileUpload : ", file);
        fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        let self = this;
        fileReader.onload = function () {
            console.log(fileReader.result);
            let base64data = fileReader.result;
            console.log("handleFileUpload base64data: ", base64data);
            // console.log("[QuationComponent] handleFileUpload : ", this.state.is_option_image);
            self.setState({
                ...self.state,
                original_image: base64data,
                file_path: file.name
            });

        }
    });

    handleMaskSelect=((mask)=>{
        console.log("handleMaskSelect: ", mask);
        this.setState({
            ...this.state,
            selected_mask_dict: mask
        })
    });
    
    performFilter=(()=>{
        console.log("In perform filter: ",this.state.selected_mask_dict, this.state.original_image);
        let payload = {
            original_image: this.state.original_image,
            mask_dict: this.state.selected_mask_dict,
            filter:this.state.selected_filter
        };

        performFilter(payload).then((res)=>{
            console.log("Perform Filter status: ",res.status);
            if(res.status === 200){
                console.log("WOPPPIIEEE: "); //TODO: Return Filtered Image
                res.json().then(((data)=>{
                    console.log("performFilter Response Body: ", data);
                    this.setState({
                        ...this.state,
                        filtered_image: data.filtered_image
                    })
                }));
            }
            else{
                console.log("ITS SAD TO HEAR!!");
            }
        })
    });

    render() {
        return(
            <div className="container-fluid">
                <label className="h1">Welcome to Digital Processing</label>
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                        {this.showFilterTypes()}
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4" align="left">
                        {this.showFilters()}
                    </div>
                    <div>
                        <button id="btn_select_filter" type="button" className="btn btn-primary"
                                disabled={!(this.state.selected_filter_type && this.state.selected_filter)}
                                data-toggle="modal"
                                data-target="#exampleModalLong"
                            >
                            Select Filter
                        </button>
                    </div>

                    <div>
                        <button id="btn_select_filter" type="button" className="btn btn-primary"
                                onClick={(()=>{
                                    this.setState({
                                        ...this.state,
                                        selected_filter_type: "",
                                        selected_filter: "",
                                        mask_list: [],
                                        selected_mask_dict: [],
                                        original_image:"",
                                        file_path: "",
                                        filtered_image:"",
                                    })
                                })}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6">
                        <div className="input-group mb-3">
                            <input type="text" value={this.state.file_path} className="form-control" placeholder="File Path" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-primary" onClick={(()=>{document.getElementById("fileBrowse").click()})}>Browse</button>
                            <input type="file" id="fileBrowse" hidden={true} onChange={((event)=>{this.uploadImage(event)})}/>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6">
                        <button type="button" className="btn btn-primary"
                                disabled={!(this.state.original_image && this.state.selected_mask_dict.mask)}
                                onClick={(()=>{this.performFilter()})}> Apply Filter</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6">
                        <img className="img-fluid" src={(this.state.original_image ? this.state.original_image : notavailable)} alt="original pic"/>
                    </div>
                    <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6">
                        <img className="img-fluid" src={(this.state.filtered_image ? this.state.filtered_image : notavailable)} alt="filtered pic"/>
                    </div>
                </div>
                <div>
                    <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <SelectFilter
                                        filter = {this.state.selected_filter}
                                        mask_list = {this.state.mask_list}
                                        handleMaskSelect = {this.handleMaskSelect}
                                        selected_mask_dict = {this.state.selected_mask_dict}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                                            disabled={!this.state.selected_mask_dict.mask}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;