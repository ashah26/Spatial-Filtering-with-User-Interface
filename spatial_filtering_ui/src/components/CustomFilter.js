import  React,{Component} from 'react'
import CustomInputMat from "./CustomInputMat";

class CustomFilter extends Component{

    constructor(){
        super();
        this.state = {
            custom_filter_range: "3",
            custom_mask: [],
            custom_mat:[]
        };
    }

    componentDidMount() {
        console.log("CustomFilter DidMount: ", this.props.mask_list, this.props.filter);
    }

    handle_size_change = ((size)=>{
        let mat = new Array(size);
        for(let i=0; i<size; i++){
            mat[i] = new Array(size).fill("");
        }
        this.setState({
            ...this.state,
            custom_filter_range: size,
            custom_mat: mat
        })
    });

    showCustomInputMatrix = (()=>{
        console.log("custom_filter_range: ", this.state.custom_filter_range);
        if(this.state.custom_filter_range===3 || this.state.custom_filter_range===5 || this.state.custom_filter_range===7) {
            return (
                <CustomInputMat
                    custom_mat={this.state.custom_mat}
                    range={this.state.custom_filter_range}
                    row_range={3}
                    col_range={3}
                />
            );
        }
            // switch (this.state.custom_filter_range) {
            //     case 3:
            //         return (
                        {/*<CustomInputMat*/}
                            // range={}
                            // row_range={3}
                            // col_range={3}
                        // />
                    // );
                // case 5:
                //     return (
                        {/*<CustomInputMat*/}
                            // row_range={5}
                            // col_range={5}
                        // />
                    // );
                // case 7:
                //     return(
                        {/*<CustomInputMat*/}
                            // row_range={7}
                            // col_range={7}
                        // />
                    // );
                // default:
                //     console.log("");
                //     break;
            // }
        // }
    });

    render() {
        return(
            <div>
                <div className="row">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            Select Size
                        </button>
                        <div className="dropdown-menu">
                            <span className="dropdown-item" onClick={(()=>{this.handle_size_change(3)})}>3x3</span>
                            <span className="dropdown-item" onClick={(()=>{this.handle_size_change(5)})}>5x5</span>
                            <span className="dropdown-item" onClick={(()=>{this.handle_size_change(7)})}>7x7</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {this.showCustomInputMatrix()}
                </div>
            </div>
        )
    }

}


export default CustomFilter;
