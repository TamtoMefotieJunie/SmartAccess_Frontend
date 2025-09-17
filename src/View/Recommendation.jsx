import React, { useState, useEffect } from 'react';
import {Add,Place,AccessTime,Directions,Description,Close,Healing,Map,Star}from '@mui/icons-material';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Modal,Box,TextField,Typography,Chip,Tabs,Tab,Divider} from '@mui/material';
import Navbar from '../Components/Bar/Navbar'; 

function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [newCenter, setNewCenter] = useState({
    city: '',
    region: '',
    specialty: '',
    description: '',
    reasoningFactors: [],
    confidenceScore: ''
  });

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
       console.log("hi")
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        const mockData = [
          {
            _id: '1',
            model_type: 'Emergency Prediction Model',
            recommendation_case: 'emergency_analysis',
            patient_encounter: { _id: 'e1', case: 'Trauma' },
            recommended_hospital: { _id: 'h1', name: 'Central Hospital Yaoundé' },
            recommended_specialty_offering: { _id: 's1', name: 'Trauma Center' },
            recommended_route_time_min: 15,
            recommended_route_distance: 5.2,
            confidence_score: 0.87,
            reasoning_factors: ['High trauma cases', 'Proximity to accident-prone areas'],
            timestamp_generated: '2023-06-15T10:30:00Z'
          },
          {
            _id: '2',
            model_type: 'Population Health Model',
            recommendation_case: 'new_establishment',
            recommended_City: 'Mokolo',
            recommended_region: 'Centre',
            desired_specialty: 'Pediatrics',
            confidence_score: 0.92,
            reasoning_factors: ['High child population', 'No pediatric center in 10km radius'],
            timestamp_generated: '2023-06-10T14:45:00Z'
          }
        ];
        setRecommendations(mockData);
      }
    };

    fetchRecommendations();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCenter(prev => ({ ...prev, [name]: value }));
  };

  const handleAddReasoningFactor = () => {
    if (newCenter.reasoningFactorInput) {
      setNewCenter(prev => ({
        ...prev,
        reasoningFactors: [...prev.reasoningFactors, prev.reasoningFactorInput],
        reasoningFactorInput: ''
      }));
    }
  };

  const handleRemoveReasoningFactor = (index) => {
    setNewCenter(prev => ({
      ...prev,
      reasoningFactors: prev.reasoningFactors.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newCenter,
          recommendation_case: 'new_establishment',
          model_type: 'Manual Proposal'
        })
      });
      
      if (response.ok) {
        const updatedRecs = await fetch('/api/recommendations');
        setRecommendations(await updatedRecs.json());
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const emergencyRecommendations = recommendations.filter(r => r.recommendation_case === 'emergency_analysis');
  const establishmentRecommendations = recommendations.filter(r => r.recommendation_case === 'new_establishment');

  return (
    <div className="w-full h-full overflow-y-hidden">
      <Navbar/>
      <div className="flex justify-between items-center mb-6 mt-6">
        <Typography variant="h4" className="text-[#317e3d]">
          Health Center Recommendations
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenModal}
          style={{ backgroundColor: '#317e3d', color: 'white' }}
        >
          Create New Health Center
        </Button>
      </div>

      <Tabs value={activeTab} onChange={handleTabChange} className="mb-4">
        
        <Tab label="New Establishment" />
      </Tabs>
      {activeTab === 0 && (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead style={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><Healing fontSize="small" /> <strong>Recommended Specialty</strong></TableCell>
                <TableCell><Star fontSize="small" /> <strong>Confidence</strong></TableCell>
                <TableCell><Description fontSize="small" /> <strong>Reasoning Factors</strong></TableCell>
                <TableCell><strong>Generated</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {establishmentRecommendations.map((rec) => (
                <TableRow key={rec._id} hover>
                  <TableCell>
                    <div className="flex items-center">
                      <Map color="action" fontSize="small" className="mr-1" />
                      {rec.recommended_City}, {rec.recommended_region}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip label={rec.desired_specialty} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={`${(rec.confidence_score * 100).toFixed(0)}%`}
                      color={
                        rec.confidence_score > 0.8 ? 'success' :
                        rec.confidence_score > 0.6 ? 'warning' : 'error'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rec.reasoning_factors?.map((factor, i) => (
                        <Chip key={i} label={factor} size="small" className="m-1" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(rec.timestamp_generated)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" className="text-[#317e3d]">
              Propose New Health Center
            </Typography>
            <Button onClick={handleCloseModal} size="small">
              <Close />
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <TextField
                label="City"
                name="city"
                value={newCenter.city}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Region"
                name="region"
                value={newCenter.region}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Specialty"
                name="specialty"
                value={newCenter.specialty}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                size="small"
                select
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                <option value="General Practice">General Practice</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Maternity">Maternity</option>
                <option value="Trauma">Trauma</option>
                <option value="Cardiology">Cardiology</option>
              </TextField>
              <TextField
                label="Confidence Score (0-1)"
                name="confidenceScore"
                type="number"
                inputProps={{ min: 0, max: 1, step: 0.1 }}
                value={newCenter.confidenceScore}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </div>

            <TextField
              label="Description"
              name="description"
              value={newCenter.description}
              onChange={handleInputChange}
              required
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              size="small"
              className="mb-4"
            />

            <div className="mb-4">
              <Typography variant="subtitle2" className="mb-2">
                Reasoning Factors
              </Typography>
              <div className="flex gap-2 mb-2">
                <TextField
                  label="Add Reasoning Factor"
                  name="reasoningFactorInput"
                  value={newCenter.reasoningFactorInput || ''}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                <Button 
                  variant="outlined" 
                  onClick={handleAddReasoningFactor}
                  disabled={!newCenter.reasoningFactors}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {newCenter.reasoningFactors.map((factor, index) => (
                  <Chip
                    key={index}
                    label={factor}
                    onDelete={() => handleRemoveReasoningFactor(index)}
                    size="small"
                  />
                ))}
              </div>
            </div>

            <Divider className="my-4" />

            <div className="flex justify-end space-x-2">
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                style={{ backgroundColor: '#317e3d', color: 'white' }}
              >
                Submit Proposal
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Recommendation;