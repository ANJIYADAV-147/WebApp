import {Component} from 'react'
import Cookies from 'js-cookie'
import { IoSearch } from "react-icons/io5";
import Modal from 'react-modal';
import ImageItem from '../ImageItem';
import './index.css'



class WebApp extends Component{
    state = {
        
        searchInput: 'nature',
        listPhotos:[],
        showModal: false,
        modalContent: {},
      }

      componentDidMount(){
        this.getPhotos()
      }

      getPhotos=async()=>{
        const jwtToken=Cookies.get('jwt_token')
       const {searchInput}=this.state
        const apiUrl=`https://api.unsplash.com/search/photos?query=${searchInput}&client_id=eY_a_RQZQjK19ROg_jnZPuJBWjEphb4Gr542bosgohM`
        const options={
            headers:{
                Authorization:`Bearer ${jwtToken}`
            },
            method:"GET",
        }
        const response=await fetch(apiUrl,options)
        const data=await response.json()
       
       const updatedData=data.results.map(eachData=>({
            id:eachData.id,
            regular:eachData.urls.regular,
            description: eachData.description ,
            alt_description: eachData.alt_description ,
       }))
       this.setState({listPhotos:updatedData})
        
      }


      onChangeSearchInput=(event)=>{
        this.setState({searchInput:event.target.value})
      }

      onSearchClick=()=>{
        this.getPhotos()
      }

      openModal = (content) => {
        this.setState({showModal: true, modalContent: content})
      }

      closeModal = () => {
        this.setState({showModal: false, modalContent: {}})
      }

    render(){
        const {searchInput,listPhotos, showModal, modalContent}=this.state
        return(
            <div className='web-app-container'>
                <h1 className='heading'>Web App</h1>
                <div className='search-container'>
                    <input type='search' className='search-input' value={searchInput} onChange={this.onChangeSearchInput} placeholder='search'/>
                    <IoSearch onClick={this.onSearchClick}/>
                </div>
               
                <ul type='none' className='photos-list'>
                    {listPhotos.map(eachImage=>(
                        <ImageItem key={eachImage.id} imageDetails={eachImage}/>
                    ))}
                </ul>

                <Modal 
                  isOpen={showModal}
                  onRequestClose={this.closeModal}
                  contentLabel="Image Details"
                  ariaHideApp={false}
                >
                  <h2>Image Details</h2>
                  <img src={modalContent.regular} alt={modalContent.alt_description} className='modal-image'/>
                  <p>{modalContent.description}</p>
                  <button onClick={this.closeModal}>Close</button>
                </Modal>
               
            </div>
        )
    }
}
export default WebApp