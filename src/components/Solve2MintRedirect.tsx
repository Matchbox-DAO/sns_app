import styled from 'styled-components'
import Image from 'next/image'
import ArrowRight from './ArrowRight'

const Wrapper = styled.div`
  width: 700px;
  position: absolute;
  bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  left: 0px;
  right: 0px;
  background: rgb(255, 255, 255);
  border-radius: 14px;
  max-width: 90%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  padding: 15px;
  /* cursor: pointer; */
  /* box-shadow: rgb(144 171 191 / 42%) 3px 4px 20px 0px; */
`

const Solve2MintLink = styled.a`
  display: grid;
  grid-template-columns: 1fr 50px;
  flex-grow: 1;
  text-decoration: none;
  transition: all 0.2s ease 0s;
  align-items: center;
`

const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  row-gap: 5px;
`

const Title = styled.h3`
  color: rgb(14, 14, 14);
  font-weight: bold;
  font-size: 18px;
  margin: 0;
`

const Subtitle = styled.p`
  color: rgb(120, 120, 120);
  font-weight: 500;
  font-size: 15px;
`

const Icon = styled.div`
  display: block;
  margin: auto;
`

export function Solve2MintRedirect() {
  return (
    <Wrapper>
      <Solve2MintLink
        href={'https://github.com/Matchbox-DAO/fountain/tree/v0.1/examples/zeroxstrat_v1'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TextSection>
          <Title>Solve2Mint Contract Now Available for Reading</Title>
          <Subtitle>
            If you want to get a head start on Solve2Mint game, consider reading the Solve2Mint contract by clicking
            here.
          </Subtitle>
        </TextSection>
        <Icon>
          <ArrowRight />
        </Icon>
      </Solve2MintLink>
    </Wrapper>
  )
}
