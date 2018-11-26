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
            return this.props.mask_list.map((mask, index)=>{
                return (
                    <div className="container-fluid">
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                            <input type="radio" className="custom-control-input" id={"mask"+index}
                                   name="mask_rdb"
                                   onClick={(() => {
                                       this.props.handleMaskSelect(mask);
                                   })}
                            />
                            <label className="custom-control-label" htmlFor={"mask"+index}></label>
                        </div>
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