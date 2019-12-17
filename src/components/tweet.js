import React, { Component } from 'react'
import {connect} from 'react-redux'
import {formatTweet, formatDate} from "../utils/helpers";
import {TiArrowBackOutline} from 'react-icons/ti'
import {TiHeartOutline} from 'react-icons/ti'
import {TiHeartFullOutline} from 'react-icons/ti'
import {handleToggleTweet} from "../actions/tweets";

class Tweet extends Component {
    toParent = (e, id) => {
        e.preventDefault()
        // todo: direct to parent tweet
    }
    handleLike = (e) => {
        e.preventDefault()
        const {dispatch, tweet, authedUser} =  this.props
        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
    }
    render() {
        const { tweet } = this.props
        if(tweet === null) {
            return <p>This tweet doesn't exist</p>
        }
        const { name, avatar, timestamp, text, hasLiked, likes, replies, parent} = tweet
        console.log(this.props)
        return(
            <div className='tweet'>
                <img src={avatar}
                     alt={`Avatar of ${name}`}
                     className='avatar' />
                     <div className='tweet-info'>
                         <div>
                             <span>{name}</span>
                             <div>{formatDate(timestamp)}</div>
                             {parent && (
                                 <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                     Replying to @{parent.author}
                                 </button>
                             )}
                             <p>{text}</p>
                         </div>
                         <div className='tweet-icons'>
                             <TiArrowBackOutline classname='tweet-icon'/>
                             <span>{replies !==0 && replies}</span>
                             <button className='heart-button' onClick={(e) => this.handleLike(e)}>
                                 {hasLiked === true ? <TiHeartFullOutline color='#e0245e' classname='tweet-icon'/> :
                                 <TiHeartOutline classname='tweet-icon'/>}
                             </button>
                             <span>{likes !== 0 && likes}</span>
                         </div>
                     </div>
            </div>
        )
    }
}
// The important thing to notice here is that mapStateToProps accepts two arguments:
// the state of the store
// the props passed to the Tweet component
const mapStateToProps = ({tweets , users, authedUser}, {id}) => {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null
    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet): null
    }
}

export default connect(mapStateToProps)(Tweet)