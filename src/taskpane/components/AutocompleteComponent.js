import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useState, useEffect } from "react";
import { constants } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from '../../actions';
import { Typography } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    width: 230,
    marginLeft: 16,
    marginTop: 8,
    "& > * + *": {
      marginTop: theme.spacing(1)
    },
    groupLabel: {
      fontSize: 30
    }
  },
  autocomplete: {
    groupLabel: {
      fontSize: 30
    }
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    }
  }
}));

export const AutocompleteComponent = props => {
  const [tags, setTags] = useState();
  //const [tagData, setTagData] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const tagState = useSelector(state => state.tags);
  let loadedAssetTags;
  let loadedIssuerTags;
  let loadedStaticTags;
  debugger;
  if (tagState) {
    if (tagState.assetTags) {
      loadedAssetTags = tagState.assetTags
    }
    if (tagState.issuerTags) {
      loadedIssuerTags = tagState.issuerTags
    }
    if (tagState.staticTags) {
      loadedStaticTags = tagState.staticTags
    }
  }
  const theme = useTheme();
  debugger;
  props.tags.tagdata = tags;
  //setTagData(props.tagData);
  //let tagData = props.tagData;
  const subTab = props.subTab
  let autocomplete;

  if (subTab) {
    if (subTab == constants.ASSET_TAB) {
      autocomplete = <Autocomplete
        className={classes.autocomplte}
        multiple
        id="autocomplete-tags"
        size="small"
        options={loadedAssetTags}
        onChange={(event, newValue) => {
          setTags(newValue);
          dispatch(userActions.addNewTag(newValue));
        }}
        getOptionLabel={option => option.TagName}
        groupBy={option => option.UniqueIdentifier}
        renderInput={params => <Typography variant="caption"><TextField {...params} variant="outlined" label="Search Tags.." /></Typography>}
      />
    }
    else if (subTab == constants.ISSUER_TAB) {
      debugger;
      autocomplete = <Autocomplete
        className={classes.autocomplte}
        multiple
        id="autocomplete-tags"
        size="small"
        options={loadedIssuerTags}
        onChange={(event, newValue) => {
          setTags(newValue);
          dispatch(userActions.addNewTag(newValue));
        }}
        getOptionLabel={option => option.TagName}
        groupBy={option => option.UniqueIdentifier}
        renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
      />
    }
    else {
      autocomplete = <Autocomplete
        className={classes.autocomplte}
        multiple
        id="autocomplete-tags"
        size="small"
        options={loadedStaticTags}
        onChange={(event, newValue) => {
          setTags(newValue);
          dispatch(userActions.addNewTag(newValue));
        }}
        getOptionLabel={option => option.TagName}
        groupBy={option => option.UniqueIdentifier}
        renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
      />
    }
  }

  const renderGroup = params => [
    <ListSubheader key={params.key} component="div">
      {params.key}
    </ListSubheader>,
    params.children
  ];

  return (
    <React.Fragment>
      <div className={classes.root}>
        {autocomplete}
      </div>

    </React.Fragment >
  );
};



export default AutocompleteComponent;
