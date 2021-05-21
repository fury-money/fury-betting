import Banner from 'components/Banner/Banner';
import ImportantMatch from 'components/Events/ImportantMatch';
import { IMatch } from 'types/Match.model';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from 'shared/Spinner/Loader';
import { getCouponFromStorage } from 'store/actions';
import { transformDate } from 'utilities/transformDate';
import { StyledMainPage } from './MainPage.css';
import axiosConfig from 'utilities/axiosConfig';
import EventCounterMobile from 'components/Coupon/EventCounterMobile';
import MatchMin from 'components/Events/MatchMin';
import DailyBonus from 'components/User/DailyBonus';
import { AuthContext } from 'context/AuthContext';

function MainPage(): JSX.Element {
    const { userData } = useContext(AuthContext);
    const [importantMatches, setImportantMatches] = useState<IMatch[]>([]);
    const [matches, setMatches] = useState<IMatch[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await axiosConfig.get('/events?ended=false&started=false');
        const matches: IMatch[] = res.data.filter((match: IMatch) => !match.important);
        const ImportantMatches: IMatch[] = res.data.filter((match: IMatch) => match.important);

        setImportantMatches(ImportantMatches);
        setMatches(matches);
        setIsLoaded(true);
        dispatch(getCouponFromStorage());
    };

    return (
        <StyledMainPage>
            <EventCounterMobile />
            {userData.bonusDate && new Date().getTime() - new Date(userData.bonusDate).getTime() > 864e5 && (
                <DailyBonus></DailyBonus>
            )}
            <Banner image="https://i.pinimg.com/originals/5e/37/a4/5e37a4179884eee9be9dbf640b44474b.png" />
            {!isLoaded && <Loader />}
            <div className="matches-container">
                {importantMatches.map(
                    ({ _id, date, teamAway, teamHome, category, courseAwayWin, courseDraw, courseHomeWin }) => (
                        <ImportantMatch
                            key={_id}
                            eventId={_id}
                            league={category.name}
                            date={transformDate(date)}
                            teamAway={teamAway}
                            teamHome={teamHome}
                            courseAwayWin={courseAwayWin}
                            courseDraw={courseDraw}
                            courseHomeWin={courseHomeWin}
                        />
                    )
                )}
            </div>
            <div className="matches-container">
                {matches.map(
                    ({ _id, date, teamAway, teamHome, category, courseAwayWin, courseDraw, courseHomeWin }) => (
                        <MatchMin
                            key={_id}
                            eventId={_id}
                            league={category.name}
                            date={transformDate(date)}
                            teamAway={teamAway}
                            teamHome={teamHome}
                            courseAwayWin={courseAwayWin}
                            courseDraw={courseDraw}
                            courseHomeWin={courseHomeWin}
                        />
                    )
                )}
            </div>
        </StyledMainPage>
    );
}

export default MainPage;