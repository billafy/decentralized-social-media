import styled from "styled-components";
import { BsChevronUp, BsChevronDown, BsChevronRight } from "react-icons/bs";
import Moment from 'react-moment';
import { Colors } from "../Theme";

const EditionSelectorEl = styled.article`
    display: flex;
    border: 1px solid ${Colors.Border};
    align-items: center;
    gap: 1rem;
    padding-right: 1rem;
`;
const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const TopBtn = styled.span`
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border-right: 1px solid ${Colors.Border};
    border-bottom: 1px solid ${Colors.Border};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
`;
const BottomBtn = styled(TopBtn)`
    border-bottom: none;
`;
const EdInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;
const EditionLabel = styled.span`
    font-weight: 500;
`;

const MintDate = styled.span`
    color: ${Colors.Gray};
    font-size: 0.9rem;
`;
const SelectEdition = styled.a`
    color: ${Colors.Primary};
    font-size: 0.95rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

export default function EditionSelector(props) {
    return (
        <EditionSelectorEl>
            <BtnContainer>
                <TopBtn>
                    <BsChevronUp />
                </TopBtn>
                <BottomBtn>
                    <BsChevronDown />
                </BottomBtn>
            </BtnContainer>
            <EdInfo>
                <EditionLabel>Token ID #{props.edition}</EditionLabel>
                <MintDate>
					Minted on {" "}
					<Moment format="D MMM YYYY" withTitle>
						{props.mintDate}
					</Moment>
				</MintDate>
            </EdInfo>   
            <SelectEdition href="#">
                Select Edition <BsChevronRight />
            </SelectEdition>
        </EditionSelectorEl>
    );
}
