import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import ReactStars from "react-rating-stars-component";
import Container from "../../components/atoms/Container"
import AuthInput from "../../components/molecules/AuthInput"
import styled from "styled-components"
import Button from '../../components/atoms/Button';
import SmallButton from "../../components/atoms/SmallButton"
import getDesignerInfo from "../../api/designer/getDesignerInfo"
import getUserInfo from "../../api/user/userGetInfo";
import createReview from "../../api/review/createReview"
const DesignerView = ({match}) => {
    const history = useHistory();
    const [name, setName] = useState('이준호');
    const [location, setLocation] = useState('서울');
    const {id} = useParams ();
    
    const [previewURL, setPreviewURL] = useState(null);

    const [rating1, setRating1] = useState(0);
    const [rating2, setRating2] = useState(0);
    const [rating3, setRating3] = useState(0);
    const rating1Changed = (newRating) => {
        setRating1(newRating);
    }
    const rating2Changed = (newRating) => {
        setRating2(newRating);
    }
    const rating3Changed = (newRating) => {
        setRating3(newRating);
    }
    useEffect(() => {
        const initUpdate = async () => {
            
            const Infomation = await getDesignerInfo(id);
            setName(Infomation.result.name);
            setLocation(Infomation.result.location);
            setPreviewURL(`${process.env.REACT_APP_BACKEND_API_URL}/img/${Infomation.result.pictureUrl}`);
        };
        initUpdate();
    }, [])
    const onReview = async () => {
        const userInfo = await getUserInfo();
        console.log("userInfo", userInfo.result.id);
        const review = await createReview(userInfo.result.id, id, "커트", rating1);
        await createReview(userInfo.result.id, id, "염색", rating2);
        await createReview(userInfo.result.id, id, "펌", rating3);
        alert(review.reason);
        return;
    }
    return(
        <>
        <ContainerBox>
            <Title>디자이너 정보</Title>
            <ProfileBox>
                    <Label>프로필 사진</Label>
                    <ProfileImage src={previewURL}/>
            </ProfileBox>
            <InfomationBox>
                <Label>아이디</Label>
                <LabelText style={{ marginBottom: 20 }}>
                    {match.params.id}
                </LabelText>
                <Label>이름</Label>
                <LabelText style={{ marginBottom: 20 }}>
                    {name}
                </LabelText>
                <Label>근무 지역</Label>
                <LabelText style={{ marginBottom: 20 }}>
                    {location}
                </LabelText>
            </InfomationBox>
            
        </ContainerBox>
        
        <ContainerBox>
            <ReviewText>리뷰 작성</ReviewText>
            <StarBox>
                <DesignType>커트</DesignType>
                <ReactStars
                    count={5}
                    onChange={rating1Changed}
                    size={24}
                    isHalf={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
            </StarBox><br/>
            <StarBox>
                <DesignType>염색</DesignType>
                <ReactStars
                    count={5}
                    onChange={rating2Changed}
                    size={24}
                    isHalf={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
            </StarBox><br/>
            <StarBox>
                <DesignType>펌</DesignType>
                <ReactStars
                    count={5}
                    onChange={rating3Changed}
                    size={24}
                    isHalf={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
            </StarBox><br/>
            <SmallButton text="리뷰 남기기" width={"120px"} height={"30px"} onClick={() => onReview()}/>
        </ContainerBox>
        <Button text="목록으로" width={"208px"} height={"60px"} onClick={() => history.goBack()}/>
        </>
    )
}
export default DesignerView;
const StarBox = styled.div`
    display: inline-block;
    width: 120px;
    margin-bottom: 40px;
`
const DesignType = styled.p`
    width: 120px;
    padding: 10px 0px;
    font-weight: 300;
    font-size: 18px;
    line-height: 14px;
    color: #000000;
    border: 1px solid black
`
const ContainerBox = styled(Container)`
    padding-bottom: 20px;
    border-bottom: 2px solid #444444;
    margin-bottom: 20px;
    text-align: center;
`
const InfomationBox = styled.div`
    float: left;
    width: 50%;
`
const Title = styled.p`
    font-weight: 600;
    font-size: 30px;
    line-height: 14px;
    color: #000000;
    text-align: center;
    padding-bottom: 60px;
    border-bottom: 2px solid #444444;
`
const Review = styled.p`
    font-weight: 600;
    font-size: 18px;
    line-height: 14px;
    width: 80%;
    text-align: center;
    margin: 0 auto;
    padding: 20px 0px;
`
const ReviewText = styled.p`
    font-weight: 600;
    font-size: 18px;
    line-height: 14px;
    width: 100%;
    padding: 20px 0px;
`
const Label = styled.p`
    font-weight: 600;
    font-size: 18px;
    line-height: 14px;
    width: 400px;
    text-align: left;
    margin: 0 auto;
    padding: 20px 0px;
`
const LabelText = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 14px;
    width: 400px;
    text-align: left;
    margin: 0 auto;
    padding: 20px 0px;
    border-bottom: 1px solid black;
    color: #666666;
`
const ProfileBox = styled.div`
    width: 50%;
    float: left;
    text-align: center;
`
const ProfileImage = styled.img`
    width: 300px;
    height: 300px;
    object-fit: contain;
`