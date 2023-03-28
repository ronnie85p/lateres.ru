const PageError = (props) => {
    const { 
        text,
        icon
    } = props;

    let iconDefault = icon || 'icon-alert-triangle';

    return <div className="alert alert-danger page-error">
        <div><i className={iconDefault}></i>&nbsp;{text}</div>
    </div>;
};

export {
    PageError
}