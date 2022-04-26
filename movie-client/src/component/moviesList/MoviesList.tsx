import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Alert, Col, Row, Toast, ToastContainer } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import IMovie from "../../model/IMovie";
import { getMovies } from "../../services/movies";
import { LoadingStatus } from "../../utils/types";
import LoadingIndicator from "../common/LoadingIndicator";
import MovieListItem from "./MovieListItem";

type State = {
    status: LoadingStatus,
    movies?: IMovie[],
    moviesToShow?: IMovie[],
    error?: Error,
    searchString: string,
    show1:boolean
    show2:boolean
}

class MoviesList extends Component<RouteComponentProps, State> {
    state : State = {
        status: 'LOADING',
        searchString:'',
        show1:true,
        show2:true
    };
    
    updateValue = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { value } = event.target;

        this.setState(
            state => {
                return {
                    searchString : value
                }
            },
            () => {
                this.searchMovie(this.state.searchString);
            }
        )
    }

    searchMovie(searchString: string){
        this.setState({
            status: 'LOADING'
        });

        const moviesToShow = this.state.movies?.filter(x =>{
            return x.title.toLowerCase().includes(searchString.toLowerCase());
        })
        this.setState({
            status: 'LOADED',
            moviesToShow
        });
    }

    render() {
        const { status, moviesToShow, error, searchString, show1, show2 } = this.state;

        let el;

        switch( status ) {
            case 'LOADING':
                el = (
                    <LoadingIndicator size="large" message="Fetching..." />
                );
                break;
            case 'ERROR':
                el = (
                    <Alert variant="danger">
                        {error?.message}
                    </Alert>
                );
                break;
            case 'LOADED':
                el = (
                    <>
                        <FontAwesomeIcon icon={faSearch} className="me-2" />    
                        <input 
                            placeholder='Search movie' 
                            className='me-2' 
                            value={searchString}
                            onChange={this.updateValue}
                        />
                        <Row xs={2} md={3} lg={5}>
                            {
                                moviesToShow?.map(
                                    (movie, idx) => (
                                        <Col key={idx} className="d-flex align-items-stretch my-3">
                                            <MovieListItem movie={movie} path={this.props.match.path}/>
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </>
                );

                break;
            default:
                break;
        }

        return el;
    }

    async componentDidMount() {
        this.setState({
            status: 'LOADING'
        });

        try {
            const movies = await getMovies(this.props.match.path);
            const moviesToShow = movies;
            this.setState({
                status: 'LOADED',
                movies,
                moviesToShow
            });
        } catch( error ) {
            this.setState({
                status: 'ERROR',
                error: error as Error
            });
        }
    }
}

export default MoviesList;