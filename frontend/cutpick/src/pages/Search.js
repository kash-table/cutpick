import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

import Container from "../components/atoms/Container"
import Text, { TextWithButton } from "../components/atoms/Text"

import sampleImage from "../assets/background.jpg";
import starImage from "../assets/star.png";
import commentImage from "../assets/comment.png";
import { Link } from "react-router-dom";
const Search = () => {
    // Emoticon Filter Tags
    const [tagList, setTagList] = useState([
        {
            type: '지역',
            tags: ['지역전체', '서울', '경기도', '인천', '울산', '대전', '광주'],
            ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            type: '시술',
            tags: ['시술전체', '커트', '염색', '펌'],
            ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            type: '정렬',
            tags: ['정렬전체', '인기순', '리뷰순'],
            ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
    ])

    const [designerList, setDesignerList] = useState([
        {
            id: 1,
            image: sampleImage,
            name: "이준호",
            location: "서울",
            star: 5,
        },
        {
            id: 2,
            image: sampleImage,
            name: "이준호",
            location: "경기도",
            star: 4,
        },
        {
            id: 3,
            image: sampleImage,
            name: "이준호",
            location: "부산",
            star: 3,
        },
    ])

    const [currentFilters, setCurrentFilters] = useState({
        지역: "지역전체",
        시술: "시술전체",
        정렬: "정렬전체",
        // 가격: '가격전체',
    })
    const [currentFiltersIndex, setCurrentFiltersIndex] = useState({
        지역ID: -1,
        시술ID: -1,
        가격ID: -1,
    })

    const onClickToggleTag = (tag, type, ids) => {
        if (currentFilters[type] === tag) {
            setCurrentFilters({
                ...currentFilters,
                [type]: tagList.find((v) => v.type === type).tags[0],
            })
            setCurrentFiltersIndex({
                ...currentFiltersIndex,
                [`${type}ID`]: -1,
            })
            return
        }
        setCurrentFilters({
            ...currentFilters,
            [type]: tag,
        })
        setCurrentFiltersIndex({
            ...currentFiltersIndex,
            [`${type}ID`]: ids,
        })
    }
    // 현재 선택된 filter를 String으로 가져와서 api 호출에 넣을 수 있게 한다.
    const formatFiltersToString = (Filters) => {
        return (
            (Filters["지역ID"] === -1 ? "" : Filters["지역ID"] + ",") +
            (Filters["시술ID"] === -1 ? "" : Filters["시술ID"] + ",") +
            (Filters["정렬ID"] === -1 ? "" : Filters["정렬ID"] + ",")
        )
    }

    // didMount
    useEffect(() => {
        // async function initEmoticon() {
        //   getEmoticonTags(setTagList)
        //   setEmoticonList(await getFilteredEmoticons("", true))
        // }
        // initEmoticon()
    }, [])

    return (
        <>
            <ExploreBar>
                {tagList.map(({ type, tags, ids }, idx) => {
                    return (
                        <TagRow key={`tagrow-${idx}`}>
                            <TagTitle>{type}</TagTitle>
                            <TagList>
                                {tags.map((tag, idx) => (
                                    <Tag
                                        key={`tag-${idx}`}
                                        onClick={() => onClickToggleTag(tag, type, ids[idx])}
                                        selected={currentFilters[type] === tag}
                                    >
                                        {`#${tag}`}
                                    </Tag>
                                ))}
                            </TagList>
                        </TagRow>
                    )
                })}
                <SelectedTags>
                    <TagTitle>탐색 태그</TagTitle>
                    <TagList>
                        {Object.entries(currentFilters).map(([type, tag], idx) => (
                            <FilteredTag key={`tag-${idx}`}>
                                {`#${tag}`}
                                <ToggleButton onClick={() => onClickToggleTag(tag, type)} />
                            </FilteredTag>
                        ))}
                    </TagList>
                </SelectedTags>
            </ExploreBar>
            <Container>
                <DesignerList>
                    {designerList.map((deginer, idx) => (
                        <Link to={`designer/read/${deginer.id}`} style={{ textDecoration: 'none', color: 'inherit'}} key={idx}>
                            <DesignerBox>
                                <DesignerImage src={sampleImage}/>
                                <DesignerIntro>
                                    <Name>{deginer.name} 디자이너님</Name>
                                    <Icon src={starImage}/><InfoText>{deginer.star}</InfoText>
                                    <Icon src={commentImage}/><InfoText>{deginer.star}</InfoText>
                                    <Location>{deginer.location}에서 주로 근무하고 있습니다.</Location>
                                </DesignerIntro>
                            </DesignerBox>
                        </Link>
                    ))}
                </DesignerList>
            </Container>
        </>
    )
}
export default Search
const Icon = styled.img`
    width: 18px;
    height: 18px;
`
const DesignerBox = styled.div`
    padding: 20px 0px;
    border-bottom: 1px solid #343434;
    display: flex;
    flex-wrap: wrap;
`
const DesignerIntro = styled.div`
    width: calc(100% - (240px));
    padding: 0px 20px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
`
const DesignerImage = styled.img`
    width: 200px;
    height: 200px;
`
const InfoText = styled(Text)`
    font-size: 24px;
    line-height: 24px;
    font-weight: 300;
    margin: 0px 15px 0px 5px;
`
const Name = styled(Text)`
    font-size: 24px;
    line-height: 60px;
    display: block;
    font-weight: bold;
`
const Location = styled(Text)`
    font-size: 18px;
    line-height: 60px;
    font-color: #eeeeee;
    display: block;
    font-weight: 450;
`
const ExploreBar = styled(Container)`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 43px;
    border-bottom: 1px solid #808080;
`

const TagRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 0 25px;
`
const TagTitle = styled(Text)`
    font-weight: 300;
    font-size: 22px;
    display: inline-block;
    width: 100px;
    border-right: 1px solid #5a5a5a;
    margin-right: 21px;
`
const TagList = styled.div``
const Tag = styled(TextWithButton)`
    font-family: 'Noto Sans KR', sans-serif;
    background: #f9f9f9;
    margin-left: 0.5rem;
    padding: 4px 16px;
    cursor: pointer;
    border-radius: 20px;
    font-weight: 300;
    font-size: 16px;
    line-height: 23px;
    color: #5a5a5a;
    outline:none;
    ${({ selected }) =>
        selected &&
        css`
        background: #826858;
        color: #ffffff;
        font-weight: 500;
    `};
`
const FilteredTag = styled(Tag)`
    background: #ffffff;
    font-weight: 500;
    cursor: unset;
    color: #826858;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`
const SelectedTags = styled(TagRow)`
    background: #f9f9f9;
    border-radius: 20px;
    padding: 15px 25px;
`
const DesignerList = styled.div`
    
`
const ToggleButton = ({ onClick }) => (
    <svg
        style={{ marginLeft: 4.51, cursor: "pointer" }}
        onClick={onClick}
        width={18}
        height={17}
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4471 3.97748C12.5936 3.83103 12.831 3.83103 12.9775 3.97748L13.5078 4.50781C13.6543 4.65425 13.6543 4.89169 13.5078 5.03814L10.0607 8.48528L13.5078 11.9324C13.6543 12.0789 13.6543 12.3163 13.5078 12.4628L12.9775 12.9931C12.831 13.1395 12.5936 13.1395 12.4471 12.9931L9 9.54594L5.55285 12.9931C5.40641 13.1395 5.16897 13.1395 5.02252 12.9931L4.49219 12.4628C4.34575 12.3163 4.34575 12.0789 4.49219 11.9324L7.93934 8.48528L4.49219 5.03814C4.34575 4.89169 4.34575 4.65425 4.49219 4.50781L5.02252 3.97748C5.16897 3.83103 5.40641 3.83103 5.55285 3.97748L9 7.42462L12.4471 3.97748Z"
            fill="#C4C4C4"
        />
    </svg>
)
