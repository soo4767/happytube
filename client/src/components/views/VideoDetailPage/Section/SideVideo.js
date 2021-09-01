import React,{useEffect,useState} from 'react'
import axios from 'axios'
function SideVideo() {
    const [SideVideos, setSideVideos] = useState([])
    useEffect(() => {
        axios.get('/api/video/getVideos')
        .then(res=>{
            if(res.data.success){
                setSideVideos(res.data.videos)
            }else{
                alert("비디오 가져오기를 실패 했습니다.")
            }
        })
    }, [])


    const renderSideVideo = SideVideos.map((video,index)=>{
        var hours = Math.floor(video.duration / 60 / 60);
        var min = Math.floor(video.duration / 60)
        var sec = Math.floor(video.duration % 60)

        return <div key={index} style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
        <div style={{ width:'40%', marginRight:'1rem' }}>
            <a href={`/video/${video._id}`}  style={{ color:'gray' }}>
                <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
            </a>
        </div>
        <div style={{ width:'50%' }}>
            <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}  </span><br />
                <span>{video.writer.name}</span><br />
                <span>{video.views}</span><br />
                {
                    hours >= 1 ? <span>{hours}: {min} : {sec}</span> : <span>{min} : {sec}</span> 
                }<br/>
            </a>
        </div>
    </div>
    })

    return (
        <React.Fragment>
            {renderSideVideo}
        </React.Fragment>


    )
}

export default SideVideo
