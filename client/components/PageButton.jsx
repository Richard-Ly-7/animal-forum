function PageButton(props){
    return (
        <div>
            <button onClick={() => {
                props.setCurrentPage(props.page);
                props.setRenderedPage("Page");
            }}>{props.page}</button>
        </div>
    );
}

export default PageButton;