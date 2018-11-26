import  React,{Component} from 'react'
import '../assets/css/CustomInputMat.css';

class CustomInputMat extends Component{

    constructor(){
        super();
        this.state = {
            custom_mat: []
        }
    }

    custom_mat = [];

    showMatrix = (()=>{
        this.custom_mat = Object.assign({}, this.props.custom_mat);
        // this.custom_mat = this.props.custom_mat;
        console.log("showmarix: ", this.props.custom_mat, this.custom_mat);
        return(
            <div className="container">
                {
                    // this.custom_mat.map((row, row_index)=>{
                    this.props.custom_mat.map((row, row_index)=>{
                        console.log("mat row: ", row, row_index);
                        return(
                            <div className="row">
                                {
                                    row.map((col, col_index)=>{
                                        console.log("mat col: ", col, col_index);
                                        return (
                                            <div id="custom_mat_input">
                                                <input type="text"
                                                       maxLength="3"
                                                       size="1"
                                                       defaultValue={this.custom_mat[row_index][col_index]}
                                                       onChange={((e)=>{
                                                           console.log("row: ", row_index, "col: ", col_index, this.custom_mat, e.target.value);
                                                           this.custom_mat[row_index][col_index] = e.target.value;
                                                       })}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    });

    handleSave = (()=>{
        console.log("HandleSave: ", this.props.custom_mat, this.custom_mat);
    });

    render() {
        return(
            <div>
                {this.showMatrix()}
                <button className="btn btn-primary" onClick={(()=>{this.handleSave()})}>Save</button>
            </div>
        )
    }
}


export default CustomInputMat;
