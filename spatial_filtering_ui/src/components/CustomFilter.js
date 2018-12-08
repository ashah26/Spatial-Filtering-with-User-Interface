import  React,{Component} from 'react'
import CustomInputMat from "./CustomInputMat";
import '../assets/css/CustomFilter.css';

class CustomFilter extends Component{

    constructor(){
        super();
        this.state = {
            custom_filter_range: "3",
            custom_mask: [],
            custom_mask_dict: {
                'id': '0',
                'name': 'custom',
                'weight': '',
                'mask': [],
                'k': 0
            },
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
            custom_mask_dict: {
                ...this.state.custom_mask_dict,
                mask: mat
            }
        })
    });

    showCustomInputMatrix = (()=>{
        console.log("custom_filter_range: ", this.state.custom_filter_range);
        if(this.state.custom_filter_range===3 || this.state.custom_filter_range===5 || this.state.custom_filter_range===7) {
            return (
                <CustomInputMat
                    custom_mask_dict={this.state.custom_mask_dict}
                    range={this.state.custom_filter_range}
                    handleMaskSelect = {this.props.handleMaskSelect}
                />
            );
        }
    });


    labelChange = (()=>{
        var changing;
        console.log("Selected Filter labelChange:  ",this.props.selected_filter)
        if(this.props.selected_filter === "Unsharp Mask Filter"){
            changing = "Enter Value of k"

        }else if (this.props.selected_filter === "First Order Derivative Filter"){
            changing ="Enter Value of weight for Sobel"
        }
        if(changing){
            return (

                <div className="enterValue">

                    {/*<label className="labelClass">*/}
                        {/*{changing}*/}
                    {/*</label>*/}


                    <input type="text" className="" placeholder={changing} onChange={((event)=>{
                        this.setState({
                            ...this.state,
                            custom_mask_dict: {
                                ...this.state.custom_mask_dict,
                                k: parseInt(event.target.value)
                            }

                        })

                    })}/>

                </div>
            )

        }

    });

    render() {
        return(
            <div>
                <div className="row">
                    {this.labelChange()}

                    <br/>
                </div>
                <div className="row selectSize">
                    <div className="btn-group" align="center">
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
