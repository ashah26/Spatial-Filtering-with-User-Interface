import React,{Component} from 'react';

class SelectFilter extends Component{

    constructor(){
        super();
    }

    render(){
        console.log("Select Filter Redner: ", this.props.mask_list);
        return(
            <div className="container-fluid">
                {
                    this.props.mask_list.map((mask, index)=>{
                        return (
                            <div className="row">
                                <span>
                                    <input type="radio" className="custom-control-input" id={"ashna"+index}
                                           name="mask_rdb"
                                           onClick={(() => {
                                              this.props.handleMaskSelect(mask);
                                           })}
                                    />

                                <label className="custom-control-label" htmlFor={"ashna"+index}></label>
                                </span>
                                <span className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                    {((mask.length > 0 && mask[0] !== 0)? mask[0] : "")}
                                </span>
                                <span className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
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
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SelectFilter;