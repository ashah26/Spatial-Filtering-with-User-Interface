import React,{Component} from 'react';
import CustomFilter from "./CustomFilter";

class SelectFilter extends Component{

    constructor(){
        super();
        this.state = {
            selection_type: "suggestion"
        }
    }

    toggleSelection = ((selection_type)=>{

        this.setState({
            ...this.state,
            selection_type: selection_type
        })

    });

    showRespectiveFilterOptions = (()=>{
        if(this.state.selection_type === "custom"){
            return(
                <div>
                    <CustomFilter
                        filter = {this.props.filter}
                        mask_list = {this.props.mask_list}
                        handleMaskSelect = {this.props.handleMaskSelect}
                    />
                </div>
            )
        }
        else if(this.state.selection_type === "suggestion"){
            return this.props.mask_list.map((mask_dict, index)=>{
                return (
                    <div className="container-fluid">
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                            <input type="radio" className="custom-control-input" id={"mask"+mask_dict.id}
                                   name="mask_rdb"
                                   checked={this.props.selected_mask_dict.id === mask_dict.id}
                                   onClick={(() => {
                                       this.props.handleMaskSelect(mask_dict);
                                   })}
                            />
                            <label className="custom-control-label" htmlFor={"mask"+mask_dict.id}>
                                {(mask_dict.hasOwnProperty("name") ? mask_dict.name : "")}
                            </label>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            {
                                mask_dict.mask.map((row, index)=>{
                                    return (
                                        <div className="row">
                                            {
                                                row.map((column, index)=>{
                                                    return(
                                                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                            {/* //TODO: add formating*/}
                                                            {column}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/*<div className="row">*/}

                                {/*if(this.props.selected_filter == 'Unsharp Mask Filter'){*/}

                                    {/*return(*/}
                                        {/*<input type="text" value={this.props.selected_mask_dict.k} className="form-control"*/}
                                        {/*aria-label="Recipient's username" aria-describedby="button-addon2"/>*/}
                                    {/*)*/}

                                {/*}*/}

                        {/*</div>*/}
                    </div>
                )
            })

        }
    });

    render(){
        console.log("Select Filter Redner: ", this.props.mask_list);
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                        <input type="radio" className="custom-control-input" id="mask_suggestions"
                               name="selection_type"
                               onClick={(() => {
                                   this.toggleSelection("suggestion");
                               })}
                               checked={this.state.selection_type === "suggestion"}
                        />

                        <label className="custom-control-label" htmlFor="mask_suggestions">Suggestions</label>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                        <input type="radio" className="custom-control-input" id="mask_custom"
                               name="selection_type"
                               onClick={(() => {
                                   this.toggleSelection("custom");
                               })}
                               checked={this.state.selection_type === "custom"}
                        />

                        <label className="custom-control-label" htmlFor="mask_custom">Custom</label>
                    </div>
                </div>
                <div className="row">
                    {this.showRespectiveFilterOptions()}
                </div>
            </div>
        )
    }
}

export default SelectFilter;